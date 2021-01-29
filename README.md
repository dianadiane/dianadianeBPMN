
## 如何使用

将项目克隆至本地:

```
git clone git@github.com:LinDaiDai/bpmn-vue-properties-panel.git
```

安装依赖:

```
npm install
```

本地启动项目:

```
npm run serve
```

打包发布至生成环境:

```
npm run build
```

控制台因为执行默认事件报错，下面三个文件更改代码
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\navigation\movecanvas\MoveCanvas.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\features\dragging\Dragging.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\diagram-js\lib\navigation\zoomscroll\ZoomScroll.js

  //源代码 event.preventDefault();
  //更改如下
  window.addEventListener('touchmove',  function(e){
    e.preventDefault()
  }, 
  { passive: false })


D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\bpmn-js\lib\features\palette\PaletteProvider.js
D:\bpmn\案例\bpmn-vue-properties-panel\node_modules\bpmn-js\dist\bpmn-modeler.development.js
  //源代码的User为Task
  //更改如下
'create.task': createAction(
      'bpmn:UserTask', 'activity', 'bpmn-icon-task',
      translate('Create Task')
    ),
  