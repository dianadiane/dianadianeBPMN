# WorkflowModelPlus
流程引擎模型设计器
## 流程设计器前端说明文档
### 一、前端技术说明
#### 1、文件清单

序号 | 名称 | (约)个数 | 备注
---|---|---|---
1 | 页面文件 | 18 | .vue文件
2 | 样式文件 | 7 | .css文件
3 | 数据文件 | 6 | .js文件
4 | 路由文件 | 1 | .vue文件
5 | 仓库文件 | 1 | .js文件
6 | 元素 | 8 | .json文件
7 | 标签 | 21 | .vue文件
8 | 元素属性 | 42 | 元素属性

#### 2、技术清单及版本
    "ant-design-vue": "^1.7.2",
    "axios": "^0.19.2",
    "bpmn-js-properties-panel": "^0.33.0",
    "camunda-bpmn-moddle": "^4.3.0",
    "core-js": "^3.4.3",
    "dayjs": "^1.10.4",
    "default-passive-events": "^2.0.0",
    "diagram-js-minimap": "^2.0.4",
    "element-ui": "^2.14.1",
    "lodash": "^4.17.20",
    "vue": "^2.6.10",
    "vuex": "^3.6.0"

### 二、运行说明
#### 1、步骤
- 运行`git clone` 克隆仓库
- 进入项目文件夹
- 运行 `npm install` 安装依赖
- 运行 `npm run start`启动本地服务

### 三、其他记录
控制台因为执行默认事件报错，下面三个文件更改代码
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\navigation\movecanvas\MoveCanvas.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\features\dragging\Dragging.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\navigation\zoomscroll\ZoomScroll.js

  > -源代码 event.preventDefault();
  > -更改如下
  window.addEventListener('touchmove',  function(e){
    e.preventDefault()
  }, 
  { passive: false })


D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\bpmn-js\lib\features\palette\PaletteProvider.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\bpmn-js\dist\bpmn-modeler.development.js
> -源代码的User为Task
> -更改如下
  ```
'create.task': createAction(
  'bpmn:UserTask', 'activity', 'bpmn-icon-task',
    translate('Create Task')
),

'create.UserTask': createAction(
  'bpmn:UserTask', 'activity', 'bpmn-icon-task',
    translate('Create UserTask')
),

'create.UserTask': createAction(
  'bpmn:UserTask', 'activity', 'bpmn-icon-Usertask',
    translate('Create UserTask')
),
```
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\bpmn-js\dist\bpmn-modeler.production.min.js

"create.UserTask": p("bpmn:UserTask", "activity", "bpmn-icon-Usertask", c("Create UserTask")),

### 四、流程设计器问题总结
1)、技术难题：
新标签，新属性，无法识别“<”和“>”； 
暂时未实现下载为 svg图形；
暂未确定数据格式，dialog 弹框需要后期完善；
