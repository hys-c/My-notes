## VSCODE原理

### 一、基础概念

1. VSCODE最小单元是文件夹，也就是说不能对单个文件进行配置，配置的最少集中在一个文件夹中
2. 每个文件夹中有相同的.vscode文件夹,这个文件夹中的三个文件settings.json,tasks.json,launch.json,它们就是配置的核心。
3. vscode下有全局设置settings.json;之后是工作区,和工作区设置settings.json,一个工作区包含了多个文件夹;

4. 在不同的工作区中我们可以选择启用/禁用不同的拓展插件以节省内存

### 二、配置文件分析

- settings.json

  - 在这个json文件中,我们可以通过**键值对**的方式设置vscode内置的或拓展插件的各项**属性**,其中就包括外部编译器地址、各项编译偏好等等。

  - 同时,vscode提供层层嵌套的settings,从高到低分别是全局设置、工作区设置、文件夹设置; 全局设置默认通过ctrl+shift+P后输入settings.json打开。

  ![image-20210228150433661](C:\Users\hys\AppData\Roaming\Typora\typora-user-images\image-20210228150433661.png)

  

  - 我们在文件夹设置中设置的属性会覆盖工作区设置、也会覆盖全局设置,反之不成立。
  - 因此,对于全局的设置,比如编辑器字体等,我们将其在user settings.json中进行设置,工作区暂不叙述,而对于每个文件夹都不同的设置,比如想在不同的文件夹中使用不同的python环境,我们选择在folder settings中(即文件夹内部的settings.json中)设置相应内容。

- tasks.json

  - 很多时候,像在使用linux系统的时候,我们会自定义一些小脚本来方便的实现一些功能,vscode就使用tasks来支持快捷实现一些方便的功能。
  - 有些拓展插件会有封装好的task可以直接执行,我们也可以自定义各种各样的task,例如实现“编译当前文件”,“删除多余文件”等等操作。
  - tasks比直接定义.bat文件更方便之处在于vscode提供了诸多快捷访问特定路径的方式,如当前文件夹的路径,vscode打开的文件夹的路径,当前文件的路径,当前文件不带拓展名的名称等等。
  - tasks.json中定义的任务仅能在当前文件夹(包含该文件夹的工作区)中使用。

  

## 三、VSCODE架构

https://zhuanlan.zhihu.com/p/96041706

## 四、VSCODE插件机制

http://www.ayqy.net/blog/%E6%8F%92%E4%BB%B6%E6%9C%BA%E5%88%B6%E8%AF%A6%E8%BF%B0_vscode%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B01/