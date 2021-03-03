# BFC（块格式化上下文）

1. 具有BFC的元素

   行内块、单元格、浮定弹网O根

2. 浮动定位和清除浮动时只会应用于同一个BFC内的元素

   - 浮动定位和清除浮动时只会应用于同一个BFC内的元素，浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（[Margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)）也只会发生在属于同一BFC的块级元素之间。
- 容器内的元素在布局上不会影响外面的元素。
   - BFC元素计算宽高时，也一起计算浮动元素
3. BFC的应用

   1. 解决外边距重叠
   2. 解决高度坍塌
   3. 阻止普通文档流元素被浮动元素覆盖
   4. 使用BFC实现自适应布局