export type AffixDirection = "left" | "top" | "right" | "bottom";
export type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
/** grid config */
export interface IGrid {
    /** 是否容器类型 */
    container?: boolean;
    /** unique identification @todo */
    id: string;
    /** x position @default 0 @todo */
    x?: number;
    /** y position @default 0 @todo */
    y?: number;
    /** width, if autoW=false and is not top container, need w config @todo */
    w?: number;
    /** whether can width stretched by content @default false @todo*/
    autoW?: boolean;
    /** min width  @todo*/
    minW?: number;
    /** max width  @todo*/
    maxW?: number;
    /** height  @todo*/
    h?: number;
    /** whether can height stretched by content @default true @todo*/
    autoH?: boolean;
    /** min height  @todo*/
    minH?: number;
    /** max height  @todo*/
    maxH?: number;
    /** affix direction */
    affix?: AffixDirection;
    /** whether can resize size @default false @todo*/
    resizeable?: boolean;
    /** whether can drag @default false @todo*/
    draggable?: boolean;
    /** resize handles */
    resizeHandles: ResizeHandle[];
    /** whether can drag out @default true  @todo*/
    bound?: boolean;
    /** 是否可以被规则自动调整 @default false  @todo*/
    static?: boolean;
}

/** container config, the container is a special grid */
export interface IContainer extends IGrid {
    container: true;
    /** scope  @todo*/
    name?: string;
    /** layout type  @todo*/
    calculator?: string;

    /** x向网格数，优先于网格粒度  @todo*/
    xcol?: number;
    /** x向网格粒度，单位px @default 1 @todo*/
    xunit?: number;
    /** 子元素x向间距  @default 0 @todo*/
    marginx?: number;
    /** x向能否溢出, autoX=false下生效  @todo*/
    overflowX?: boolean;
    /** x向预留距离，拖拽接收时有用 @default 0 @todo*/
    reverseX?: number;

    /** y向网格数，优先于网格粒度  @todo*/
    ycol?: number;
    /** y向网格粒度, 单位px @default 1  @todo*/
    yunit?: number;
    /** 子元素y向间距 @default 0  @todo*/
    marginy?: number;
    /** y向能否溢出, autoY=false下生效  @todo*/
    overflowY?: boolean;
    /** y向预留距离，拖拽接收时有用 @default 0 @todo*/
    reverseY?: number;

    /** 是否可接收元素 @default false @todo*/
    droppable?: boolean;
    /** 缩放 @default 1 @todo*/
    scale?: number;
    /** bk配置, <=width时，使用wcol，或者可以任意配置项？不确定怎么定义 @todo*/
    breakPoints?: Record<string, Partial<IContainer>>;
}

export type IEelementSelector = HTMLDivElement | string;
export interface INestGrids extends IContainer {
    children?: IContainer[];
}