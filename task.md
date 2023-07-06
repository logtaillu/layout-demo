重新再整理下逻辑
1. 哪些item是可见的，外壳如何知道
2. 全局可以只需要一个controller,container内定义内部规则(name/calculator)

定义：
Wrapper：定义一个范围，控制计算里面的多级嵌套布局
Grid：布局元素
通用：w,h,x,y,autoh,maxh,minh,resizeable,draggable,resizeHandles,isBounded
容器：isContainer,droppable,layout mode（布局规则，包含了吸附、重叠等，可能？）
容器通过data-container标识，先计算内层容器，再计算外层容器
name在容器上，不需要在Wrapper上，首先把计算过程拿过来，看下需要什么

WebWorker：
可以访问navigator和location
var worker = new Worker('work.js'); // 要执行的文件，也可以blob建立出来
worker.postMessage 给worker发送信息
worker.onmessage 接收信息
self.onmessage worker内部接收信息
可以直接传递二进制数据，但是主线程就不能用这个数据了
问题：
1. 什么时候计算：绑定有变化的状态，触发
2. 怎么操作元素：修改完返回给主线程
3. 搜索是怎么用的：filter函数，统一处理
4. 有多个controller的情况

列表
1. 拖拽布局的基础实现
2. 动效
3. 滚动下滑
4. Wrapper: 整体最大、最小、固定宽度
5. autoHeight不定高度
6. 网格化：双向，网格数/网格粒度
网格数：分成几格，定高容器才能用网格数
网格粒度：单网格体积
6. 大量数据=>类似react-virtualized的masonry的情况、同时可以滚动加载
7. resizeable
8. Grid：drag & drop
9. 嵌套多级拖拽
10. 嵌套tab=>子布局可以在好几层里面，不是直接关联的
11. 虚拟列表（自动换行）=>可以滚动加载，内外可以用不同的布局模式
12. 响应式切换
13. 固定tabar/menu=>static=>虽然总高度不定高，但是要提供占满方式，菜单可能有移动端收起的样式
13. 展示与不展示的元素:display:none，但是内部如果有复杂渲染？
14. 对齐线
15. 一屏缩放
16. 特殊组件-固定接收槽
17. 文档形式的布局

***

[
    {
        i,x,y,w,h,
        marginx,
        marginy,
        autoSize,
        container,
        wsize,wcol,
        hsize,hcol,
        children:[]
    },
]

grid
    i key
    x 横向位置
    y 纵向位置
    w 当前宽度
    h 当前高度
container
    wsize/wcol 横向网格粒度
    hsize/hcol 纵向网格粒度
    autoSize 是否撑开高度
    marginx 子元素左右间距
    marginy 子元素上下间距
emptyContainerHeight
布局类型：
1. rgl
    1. 吸附方向
    2. 允许重叠
2. packer
    1. 从左到右，向上吸附
    2. 初始sort 0/0，那么可以匹配规则

item是否需要存下来=>如果virtual load,元素不一定存在于界面上，所以需要