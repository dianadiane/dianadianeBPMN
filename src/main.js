import Vue from 'vue'
import store from '../src/store/index'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';

//element message



//控制台提醒
import 'default-passive-events'
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
    // 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式
// import 'bpmn-js-in-color/colors/color-picker.css'
import './styles/bpmn-properties-theme-red.css'
// import './styles/bpmn-properties-theme-blue.css'
// import './styles/bpmn-properties-theme-black.css'
import './styles/bpmn-custom-color.css'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'

//自己编写样式
import '../src/css/ownStyle.css'//原有
import '../src/css/reset.css'
import '../src/css/self.css'


Vue.use(ElementUI);
Vue.use(Antd);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')