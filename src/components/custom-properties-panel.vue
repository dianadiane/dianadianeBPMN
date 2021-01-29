<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <properties-view
      v-if="bpmnModeler"
      :modeler="bpmnModeler"
    ></properties-view>

    <!-- 右侧面板 -->
    <!-- <div v-if="selectBackground">没有选中元素</div> -->
    <!-- <div id="js-properties-panel"  class="panel"></div>
    <div>确定</div>
    <div>确定</div> -->
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from "bpmn-js/lib/Modeler";
import PropertiesView from "./custom-properties-panel/PropertiesView";

import { START_EVENT } from "bpmn-js/lib/features/replace/ReplaceOptions.js";

// 汉化
import customTranslate from "../customTranslate";
//地图
import minimapModule from "diagram-js-minimap";

// 原有的 properties-panel 这个框
import propertiesPanelModule from "bpmn-js-properties-panel";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
// 自定义的 properties-panel内容
import propertiesProviderModule from "./properties-panel-extension/provider/authority"; //数据

//引入JSON规范
import authorityModdleDescriptor from "./properties-panel-extension/descriptors/authority"; //数据

import { xmlStr } from "../mock/xmlStr";
import { expamle } from "../mock/expamle";
import { defaultXml } from "../mock/defaultXml"; //空
export default {
  name: "",
  components: {
    PropertiesView,
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init();
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      selectBackground: true,
    };
  },
  methods: {
    //初始化
    init() {
      // 获取到属性ref为“content”的dom节点
      this.container = this.$refs.content;
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 将汉化包装成一个模块
      const customTranslateModule = {
        translate: ["value", customTranslate],
      };

      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          // parent: "#js-properties-panel",
        },
        additionalModules: [
          // 可视化地图模块
          minimapModule,
          // 汉化模块
          customTranslateModule,
          // 右边的工具栏(固定引入)
          propertiesPanelModule,
          // 自定义右边工作栏的内容
          propertiesProviderModule,
          { zoomScroll: ["value", ""] },
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
          authority: authorityModdleDescriptor,
        },
      });
      this.createNewDiagram();
      // this.selectionChange();
    },
    createNewDiagram() {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(defaultXml, (err) => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success();
        }
      });
    },
    selectionChange() {
      const that = this;
      const { bpmnModeler } = this;

      console.log(this);
      console.log(bpmnModeler);
      console.dir(START_EVENT);
      bpmnModeler.on("selection.changed", (e) => {
        let rightPanel = document.getElementById("js-properties-panel");
        console.log("------------------------------------------------");
        that.$store.state.selectElement = e.newSelection[0];
        console.log(this);
        console.log(bpmnModeler);
        console.log(e.newSelection[0]);

        if (!e.newSelection[0]) {
          //如果点击到背景
          rightPanel.style.display = "none";
          this.selectBackground = true;
        } else {
          //一开始进
          rightPanel.style.display = "block";
          this.selectBackground = !this.selectBackground;
        }
        // this.selectedElements = e.newSelection;
        // this.element = e.newSelection[0];
        // this.$store.state.selectElement = e.newSelection[0];
        //如果点击的背景 this.element = undefined
        // if(this.element){
        //   that.isDefaultShow = false
        // }else{
        //   that.isDefaultShow = true
        // }
        this.setDefaultProperties();
      });
    },
    setDefaultProperties() {
      const { element } = this;
      if (element) {
        const { type, businessObject } = element;
        const { name } = businessObject;
        if (this.verifyIsEvent(type)) {
          this.eventType = businessObject.eventDefinitions
            ? businessObject.eventDefinitions[0]["$type"]
            : "";
          console.log(this.eventType);
        } else if (this.verifyIsTask(type)) {
          this.taskType = type;
        }
        element["name"] = name;
      }
    },
    verifyIsEvent(type) {
      return type.includes("Event");
    },
    verifyIsTask(type) {
      return type.includes("Task");
    },
    success() {
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.get("minimap").open();
      const that = this;
      this.$store.state.moduler = this.bpmnModeler;

      this.$store.state.Toos.elementRegistry = this.$store.state.moduler.get(
        "elementRegistry"
      );
      this.$store.state.Toos.modeling = this.$store.state.moduler.get(
        "modeling"
      );
      this.$store.state.Toos.bpmnFactory = this.$store.state.moduler.get(
        "bpmnFactory"
      );
      this.$store.state.Toos.elementRegistry = this.$store.state.moduler.get(
        "moddle"
      );

      console.log(this);

      this.bpmnModeler.on("commandStack.changed", function () {
        that.saveDiagram(function (err, xml) {
          console.log(xml); //输出整个xml文件
        });
      });
      //ID只读状态
      // let readonlyId = document.getElementById('camunda-id');
      // if()
      //  this.$nextTick(()=>{

      //   readonlyId.setAttribute('readonly','readonly')
      // })
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml);
      });
    },
  },
  // 计算属性
  computed: {},
};
</script>

<style scoped>
</style>