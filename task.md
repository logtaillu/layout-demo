定义：
Wrapper：外包装，定义一个范围，控制里面的多级嵌套布局
Grid的配置优先于Wrapper的
Grid：非容器元素，有宽度、高度等配置项，以及是否container的选项，这些配置项可以在dataset中标识出来
Grid有哪些属性：
容器的：isContainer,droppable,layout mode（布局规则，包含了吸附、重叠等）
通用的：w,h,x,y,autoh,maxh,minh,resizeable,draggable,resizeHandles,isBounded
列表：
~~1. 初始化~~
2. 内部元素拖拽布局/拖拽时动效和滚动
基于webworker计算布局=>
    1. 什么时候计算：绑定有变化的状态，触发
    2. 怎么操作元素：修改完返回给主线程
    3. 搜索是怎么用的：filter函数，统一处理
    4. 有多个controller的情况
muuri的hide是元素都存在,但是display:none
3. Wrapper: 整体最大、最小、固定宽度
4. autoHeight
5. 网格化：双向，网格数/网格粒度
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
14. 对齐线
15. 一屏缩放