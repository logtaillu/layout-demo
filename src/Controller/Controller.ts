// 布局控制器
// 布局元素选项
export interface IGridOptions {
    // 是否可拖拽
    draggable?: boolean;
    // 是否可接收外部元素
    droppable?: boolean;
    // 是否可调整大小
    resizeable?: boolean;
}
// 布局选项
export interface IControllerOptions extends IGridOptions{
    // 参与布局的元素选择器
    child?: string; 
}

// 默认配置
export const defaultOptions: IControllerOptions = {
    child: "*",
    draggable: true,
    droppable: true,
    resizeable: false
}
/**
 * @class
 * @param {String} name 名称，同名布局间可相互拖拽
 * @param {(HTMLElement|String)} element 目标元素
 * @param {IControllerOptions} options 配置参数
 */
export default class {
    constructor(name: string, element: HTMLElement | string, options?: IControllerOptions) {
        this.init(name, element, options);
    }
    name = "";
    element: HTMLElement | null = null;
    options?: IControllerOptions = defaultOptions;
    // 布局是否可计算，取决于element是否存在
    enable = false;
    // 初始化流程
    init(name: string, element: HTMLElement | string, options?: IControllerOptions) {
        this.name = name;
        if (typeof (element) === "string") {
            if (element) {
                this.element = document.querySelector(element);
            } else {
                this.element = null;
            }
        } else {
            this.element = element;
        }
        this.enable = this.exist();
        this.options = { ...this.options, ...options };
    }
    // element是否存在，参考muuri的判断
    exist() {
        const isInDom = this.element?.getRootNode({ composed: true }) === document || document.body.contains(this.element);
        return isInDom && this.element !== document.documentElement;
    }
}