export type IItemOrAry<T> = T | T[] | undefined;
type IItemFunc<T> = (target: T, parent?: T) => void;
type IBaseNestMap<T> = { id: string, children?: T[] };
class DefaultCreator<T>{
    item: T;
    parent?: DefaultCreator<T>;
    active? = true;
    constructor(item: T, parent?: DefaultCreator<T>) {
        this.item = item;
        this.parent = parent;
    }
}


export default class NestMap<T extends IBaseNestMap<T>, C extends {
    item: T;
    parent?: C;
    active?: boolean;
}> {
    data: T[] = [];
    linkMap: Map<string, C> = new Map();
    creator?: (item: T, parent?: C) => C;
    constructor(data?: T[], creator?: (item: T) => C) {
        if (creator) {
            this.creator = creator;
        }
        this.reset(data);
    }
    private create(val: T, parent?: C): C {
        if (this.creator) {
            return this.creator(val, parent);
        } else {
            return new DefaultCreator(val, parent) as C;
        }
    }

    toAry<S>(val: IItemOrAry<S>): S[] {
        if (Array.isArray(val)) {
            return val;
        } else {
            return val ? [val] : [];
        }
    }
    // 当前元素
    item(id: string) {
        return this.linkMap.get(id);
    }
    dataitem(id: string) {
        return this.linkMap.get(id)?.item;
    }
    // 父元素
    parent(id: string) {
        return this.item(id)?.parent;
    }
    // update link map
    private recurMap(val: IItemOrAry<T>, parent?: C) {
        this.toAry(val).forEach(info => {
            const { children, id } = info;
            const grid = this.create(info, parent);
            this.linkMap.set(id, grid);
            if (children?.length) {
                this.recurMap(children, grid);
            }
        });
    }

    // 重置数据
    reset(data?: T[]) {
        data = data ?? [];
        this.data = data;
        this.linkMap.clear();
        this.recurMap(data);
    }

    private recursive(val: IItemOrAry<T>, func: IItemFunc<C>, parent?: C) {
        this.toAry(val).forEach(info => {
            const { children, id } = info;
            const item = this.item(id);
            if (item?.active === false) {
                return;
            }
            if (children?.length) {
                this.recursive(children, func, item);
            } else if (item) {
                func(item, parent);
            }
        });
    }
    // 遍历
    forEach(func: IItemFunc<C>, id?: string) {
        // 内部遍历数据
        if (id) {
            this.recursive(this.dataitem(id), func, this.parent(id));
        } else {
            this.recursive(this.data, func);
        }
    }

    private addItems(val: IItemOrAry<T>, parentId?: string, first = false, recur = true) {
        const ary = this.toAry(val);
        const func = first ? "unshift" : "push";
        const parent = parentId ? this.dataitem(parentId) : null;
        if (!parentId || !parent) {
            this.data[func](...ary);
            if (recur) {
                this.recurMap(ary);
            }
        } else {
            parent.children = parent.children ?? [];
            parent.children[func](...ary);
            if (recur) {
                this.recurMap(ary, this.item(parentId));
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
        const parent = this.parent(id)?.item;
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
            this.addItems(item.item, newPid, false, false);
            item.parent = parent;
        }
    }
}