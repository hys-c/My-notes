new Learn for HTML

1. HTML 不区分大小写

2. 文档结构

   ```
   <!DOCTYPE html> // 告诉web浏览器使用哪一种html版本
   <html>
   <head>
   	<meta>
   	<title></title>
   </head>
   <body>
   </body>
   </html>
   ```

3. 属性不区分大小写，但是推荐小写

4. `<hr>`分割线

5. html注释 `<!-- -->`

6. `<canvas></canvas>`一个图形容器，使用js进行绘制

   

7. html 表单

   form本身常用的属性： 

   - action：URL 数据被发往的地址
   - method： 请求方法，默认get，可选get、post

   表单常用子表单项：

   ```
   <input type='test' value='' required readonly
   	placeholder='' autofocus disabled>
   	// name提交后的内容标识
   	// type 指定表单类型
   	// value指定表单初始值
   	// rquired 表单项是否必须
   	// readonly 表单项是否只读
   	// placeholder 指定提示信息
   	// autofocus 是否自动获取焦点
   	// disabled是否禁用表单
   <textarea>
   	// name 提交后的内容标识
   	// cols 宽度
   	// rows 行数
   	// rquired 表单项是否必须
   	// readonly 表单项是否只读
   	// placeholder 指定提示信息
   	// autofocus 是否自动获取焦点
   	// disabled是否禁用表单
   <button>
   	// 和<input type='submit'>的区别
   	// button内部可以放置文本或者图像
   	// 不建议使用button提交表单，因为不同浏览器有不同特性
   <select>
   	<option>
   </select>
   	// name 提交后的内容标识
   	// multiple 是否多选
   <optgroup>
   <fieldset>
   	<legend></legend>
   <fieldset>
      // 在表单元素周围生成边框
      // legend定义标题
   <label>
   label标签是为input输入框设局，label的for与input的id一致，当点击label的字时，会自动让输入框获取焦点
   ```

8. html 表格

   ```html
       <table>
           <tr> <!-- 代表每一行 -->
               <td>1</td> <!-- 代表每一个单元格 -->
               <td>2</td>
               <td>3</td>
           </tr>
           <tr>
               <td>a</td>
               <td>b</td>
               <td>c</td>
           </tr>
       </table>
   	// 当不写tbody，table内的内容默认包含在tbody，即上面的tr的父元素是tbody
   
    <table>
           <thead>
               <tr>
                   <td>姓名</td>
                   <td>年龄</td>
                   <td>电话</td>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>jack</td>
                   <td>20</td>
                   <td>155..</td>
               </tr>
           </tbody>
           <tfoot>
               <tr>
                   <td>bob</td>
                   <td>25</td>
                   <td>166</td>
               </tr>
           </tfoot>
       </table>
   
   // 无论顺序如何大论，总是thead在前，tbody在后，最后tfoot
   
   ```

   

9. Ascii

   | 控制字符    | Ascii                       |
   | ----------- | --------------------------- |
   | 0-9         | 48-57                       |
   | A-Z         | 65-90                       |
   | a-z         | 97-122                      |
   | 字符转ascii | str.charCodeAt()            |
   | ascii转字符 | String.fromCharCode(number) |

   
