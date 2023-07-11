1. 层级
wrapper:范围定义，计算内部所有布局
可以存一份IContainer的默认配置

container:容器，grid一定在container内，包含所有grid配置项
单项固定长度才能用格数，格数优先粒度配置
````ts
interface IContainer extends IGrid{
    name: string; // 同name可互相拖拽
    calculator: any; // 计算方式
    wcol: number; // 横向网格
    wunit: number; // 横向网格粒度
    hcol: number; // 纵向网格，定高时才能用
    hunit: number; // 纵向网格粒度
    marginx: number; // 子元素左右间距，在元素大小外
    marginy: number;//  子元素上下间距，在元素大小外
    reverseH: number; //底部预留高度，拖拽时有用
    droppable: boolean;//是否可接收元素
    scale: number; // 缩放
    // 双向不可溢出,grid超内容问题
    overflowX: boolean; // 定宽下，能否溢出
    overflowY: boolean; // 定高下，能否溢出
    breakPoints:{
        // 暂时认为只响应网格数
        [name]: {width, wcol}
    }
}
````
grid:单项元素，里面可以再嵌套container，menu/tabbar/tabs可以靠grid内嵌container实现
接收槽：一个特殊的container，wcol=1
````ts
interface IGrid{
    id: string; // 唯一标识
    x: number; // 横向位置
    y: number; // 纵向位置
    w: number; // 宽度
    h: number;// 高度
    autoH: boolean; // 是否可以被内部元素撑高
    autoW: boolean; // 是否可以被内部元素撑宽
    minH: number;
    maxH: number;
    minW: number;
    maxW: number;
    affix: "left"|"top"|"right"|"bottom"; // 固钉方向
    resizeable: boolean; // 是否可以调整大小
    draggable: boolean;//是否可接收元素
    resizeHandles: string[]; // resize方向
    bound: boolean; // 是否可以拖拽出容器
}
````

2. calculators
    1. rgl
        1. 单项：是否可吸附
        2. 是否可重叠(此时吸附无效)
        3. 是否填空-上一行没满，是否填上去

3. task与实现
    1. layout calculator
    2. base: wrapper，提供registerItems和calculateLayout，和worker选择
    3. base: container, registerItems, reCalculate when config change
    4. base: grid, reCalculate when config change
    5. absolute layout 基本布局展示
4. 问题
    1. calculator和bk定义,可以register calculator
    2. 嵌套容器计算问题：缩放、宽高
    id=>children
    最外层的container，没有w/h就占满

    2. 注册元素(由container统一注册children)=>给每个子元素ref?
    <!-- 不需要virtual的情况 -->
    <Container>
        <Grid/>
        <Grid/>
        <Grid/>
    </Container>
    <!-- 大量配置一起注册 -->
    <Container data={[]}>
        <Grid/>
    </Container>