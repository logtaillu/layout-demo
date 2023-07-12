type INestMap<S> = Map<string, { target: S, pid: string }>;
type IItemOrAry<S> = S | S[] | undefined;
type IItemFunc<S> = (target: S, parent?: S) => void;
type IBaseNestMap<T> = { id: string, children?: T[], active?: boolean };
export default class NestMap<T extends IBaseNestMap<T>> {
    data: T[] = [];
    linkMap: INestMap<T> = new Map();
    constructor(data?: T[]) {
        this.reset(data);
    }
    toAry<S>(val: IItemOrAry<S>): S[] {
        if (Array.isArray(val)) {
            return val;
        } else {
            return val ? [val] : [];
        }
    }
    // 内部遍历数据
    private recursive(val: IItemOrAry<T>, func: IItemFunc<T>, parent?: T) {
        this.toAry(val).forEach(info => {
            if (info.active === false) {
                return;
            }
            const { children } = info;
            if (children?.length) {
                this.recursive(children, func, info);
            } else {
                func(info, parent);
            }
        });
    }
    // 当前元素
    item(id: string) {
        return this.linkMap.get(id)?.target;
    }
    // 父id
    parentId(id: string) {
        return this.linkMap.get(id)?.pid ?? "";
    }
    // 父元素
    parent(id: string) {
        return this.item(this.parentId(id));
    }

    private recurMap(val: IItemOrAry<T>, pid = "") {
        this.recursive(val, (info, parent) => {
            this.linkMap.set(info.id, { target: info, pid: parent?.id ?? "" });
        }, this.item(pid));
    }

    // 重置数据
    reset(data?: T[]) {
        data = data ?? [];
        this.data = data;
        this.linkMap.clear();
        this.recurMap(data);
    }

    // 遍历
    forEach(func: IItemFunc<T>, id?: string) {
        if (id) {
            this.recursive(this.item(id), func, this.parent(id));
        } else {
            this.recursive(this.data, func);
        }
    }

    private addItems(val: IItemOrAry<T>, parentId?: string, first = false, recur = true) {
        const ary = this.toAry(val);
        const func = first ? "unshift" : "push";
        const parent = parentId ? this.item(parentId) : null;
        if (!parent) {
            this.data[func](...ary);
            if (recur) {
                this.recurMap(ary, "");
            }
        } else {
            parent.children = parent.children ?? [];
            parent.children[func](...ary);
            if (recur) {
                this.recurMap(ary, parentId);
            }
        }
    }

    // 添加
    insert(val: IItemOrAry<T>, parentId?: string) {
        return this.addItems(val, parentId, true);
    }

    // 添加元素
    add(val: IItemOrAry<T>, parentId?: string) {
        return this.addItems(val, parentId, false);
    }
    // 从父组件移除
    private removeFromParent(id: string) {
        const parent = this.parent(id);
        const children = parent ? parent.children : this.data;
        if (children?.length) {
            const idx = children.findIndex(s => s.id === id);
            if (idx >= 0) {
                children.splice(idx, 1);
            }
        }
    }

    // 删除
    delete(val: IItemOrAry<string>) {
        this.toAry(val).forEach(id => {
            this.removeFromParent(id);
            this.linkMap.delete(id);
        });
    }

    // 移动
    move(id: string, newPid: string) {
        const item = this.item(id);
        const parent = this.item(newPid);
        if (item && parent) {
            // remove from old parent, change link, add to newParent
            this.removeFromParent(id);
            this.addItems(item, newPid, false, false);
            this.linkMap.set(id, { target: item, pid: newPid });
        }
    }
}