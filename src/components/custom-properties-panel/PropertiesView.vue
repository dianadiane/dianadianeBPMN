<template>
  <div class="custom-properties-panel">
    <!-- <defaultShow
      :StartElement="DefaultElement"
      v-if="isDefaultShow"
    ></defaultShow> -->
    <StartPropertiesPanel
      v-if="selecetElementisStartEvent"
      :key="element.id + element.name"
    ></StartPropertiesPanel>
    <UserTaskPropertiesPanel
      v-if="selecetElementisUserTask"
      :key="element.id + element.name"
    ></UserTaskPropertiesPanel>
    <SignUserTaskPropertiesPanel
      v-if="selecetElementisSignUserTask"
      :key="element.id + element.name"
    ></SignUserTaskPropertiesPanel>
    <SequenceFlowPropertiesPanel
      v-if="selecetElementisSequenceFlow"
      :key="element.id + element.name"
    ></SequenceFlowPropertiesPanel>
    <GatewayPropertiesPanel
      v-if="selecetElementisGateway"
      :key="element.id + element.name"
    ></GatewayPropertiesPanel>
    <SubProcessPropertiesPanel
      v-if="selecetElementisSubProcess"
      :key="element.id + element.name"
    ></SubProcessPropertiesPanel>
    <CallActivityPropertiesPanel
      v-if="selecetElementisCallActivity"
      :key="element.id + element.name"
    ></CallActivityPropertiesPanel>
  </div>
</template>

<script>
import { START_EVENT } from "bpmn-js/lib/features/replace/ReplaceOptions.js";
import defaultShow from "../show/defaultShow";
//开始节点
import StartPropertiesPanel from "../show/StartEventPropertiesPanel";
//userTask节点
import UserTaskPropertiesPanel from "../show/UserTaskPropertiesPanel";
//signUsertask节点
import SignUserTaskPropertiesPanel from "../show/SignUserTaskPropertiesPanel";
//连接线节点
import SequenceFlowPropertiesPanel from "../show/SequenceFlowPropertiesPanel";
//网关节点
import GatewayPropertiesPanel from "../show/GatewayPropertiesPanel";
//子流程
import SubProcessPropertiesPanel from "../show/SubProcessPropertiesPanel";
import CallActivityPropertiesPanel from "../show/CallActivityPropertiesPanel";

// 自定义的 properties-panel内容
// import propertiesProviderModule from "./properties-panel-extension/provider/authority";
// import authorityModdleDescriptor from "./properties-panel-extension/descriptors/authority";

export default {
  name: "PropertiesView",
  props: {
    modeler: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      //默认展示开始节点
      isDefaultShow: true,
      DefaultElement: null,
      type: "",
      //因为切换同类型组件的时候，右侧面板不能及时切换，所以判断元素id，只要有变化，则重新渲染
      elementID: "",
      selecetElementisStartEvent: false,
      selecetElementisUserTask: false,
      selecetElementisSignUserTask: false,
      isSerialOrParallel: false, //是否为并行or串行;
      selecetElementisSequenceFlow: false,
      selecetElementisGateway: false,
      selecetElementisSubProcess: false,
      selecetElementisCallActivity: false,
      isSequential: "", //并行为true，串行为false

      selectedElements: [],
      element: null,
      eventTypes: [
        { label: "默认", value: "" },
        {
          label: "MessageEventDefinition",
          value: "bpmn:MessageEventDefinition",
        },
        { label: "TimerEventDefinition", value: "bpmn:TimerEventDefinition" },
        {
          label: "ConditionalEventDefinition",
          value: "bpmn:ConditionalEventDefinition",
        },
      ],
      eventType: "",
      taskTypes: [
        { label: "Task", value: "bpmn:Task" },
        { label: "ServiceTask", value: "bpmn:ServiceTask" },
        { label: "SendTask", value: "bpmn:SendTask" },
        { label: "UserTask", value: "bpmn:UserTask" },
      ],
      taskType: "",
    };
  },
  created() {
    this.init();
  },
  components: {
    // defaultShow,
    StartPropertiesPanel,
    UserTaskPropertiesPanel,
    SignUserTaskPropertiesPanel,
    SequenceFlowPropertiesPanel,
    GatewayPropertiesPanel,
    SubProcessPropertiesPanel,
    CallActivityPropertiesPanel,
  },
  methods: {
    init() {
      const { modeler } = this;
      const that = this;
      console.log(this);
      console.log(modeler);
      console.dir(START_EVENT);
      START_EVENT.forEach((element, index) => {
        if (element.label === "Start Event") {
          // that.isDefaultShow = true;
          that.DefaultElement = element;
          return;
        }
      });

      // console.log(that.isDefaultShow);
      modeler.on("selection.changed", (e) => {
        this.selectedElements = e.newSelection;
        this.element = e.newSelection[0];

        this.$store.state.selectElement = e.newSelection[0];
        //如果点击的背景 this.element = undefined
        if (!this.element) {
          this.selecetElementisStartEvent = false;
          this.selecetElementisUserTask = false;
          this.selecetElementisSignUserTask = false;
          this.selecetElementisSequenceFlow = false;
          this.selecetElementisGateway = false;
          this.selecetElementisSubProcess = false;
          this.selecetElementisCallActivity = false;
          return;
        }
        if (this.element) {
          console.log(this.element);
          console.log(this.element.type);
          this.elementID = this.element.id;
          if (this.element.businessObject.loopCharacteristics) {
            this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = true;
            this.selecetElementisStartEvent = false;
            this.selecetElementisUserTask = false;
            this.selecetElementisSignUserTask = true;
            if (this.element.businessObject.loopCharacteristics.$type) {
              this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = true;
            } else {
              this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = false;
            }
            return;
          } else {
            this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = false;
            this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential =
              "";
          }
          // console.log(this.element.businessObject.loopCharacteristics.$type);
          //如果点击了元素
          // if (this.element.type == "bpmn:Task") {
          //   const { modeler, element } = this;

          //   const modeling = modeler.get("modeling");
          //   let properties = { type: "bpmn:UserTask" };
          //   modeling.updateProperties(this.element, properties);
          // }
          // this.$nextTick(() => {
          //   let customPropertiesPanel = document.getElementsByClassName(
          //     "custom-properties-panel"
          //   )[0];
          //   console.log(customPropertiesPanel);
          //   if (!customPropertiesPanel.nextElementSibling) {
          //     customPropertiesPanel.style.backgroundColor = "#eee";
          //   } else {
          //     customPropertiesPanel.style.backgroundColor = "#fff";
          //   }
          // });
          // console.log("点击了" + this.element.type + "元素");
          // if (this.element.businessObject.loopCharacteristics) {
          //   this.selecetElementisSignUserTask = true; //有则为并行或串行
          //   this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = true;
          //   this.$store.state.readUsertaskElementextensionElements.isSequential =
          //     this.element.businessObject.loopCharacteristics.$type || false;
          //   return;
          // }

          this.setDefaultProperties();
          //如果右侧有面板，则返回
          this.type = this.element.type;
          if (this.element.type.indexOf("Gateway") != -1) {
            this.selecetElementisStartEvent = false;
            this.selecetElementisUserTask = false;
            this.selecetElementisSignUserTask = false;
            this.selecetElementisSequenceFlow = false;
            this.selecetElementisGateway = true;
            this.selecetElementisSubProcess = false;
            this.selecetElementisCallActivity = false;
            return;
          }
          console.log(this.type);
          switch (this.type) {
            case "bpmn:StartEvent":
              this.selecetElementisStartEvent = true;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = false;
              break;
            case "bpmn:UserTask":
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = true;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = false;
              break;
            case "bpmn:SequenceFlow":
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = true;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = false;
              break;
            // case "Gateway":
            //   this.selecetElementisStartEvent = false;
            //   this.selecetElementisUserTask = false;
            //   this.selecetElementisSignUserTask = false;
            //   this.selecetElementisSequenceFlow = false;
            //   this.selecetElementisGateway = true;
            //   this.selecetElementisSubProcess = false;
            //   this.selecetElementisCallActivity = false;
            //   break;
            case "bpmn:SubProcess":
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = true;
              this.selecetElementisCallActivity = false;
              break;
            case "bpmn:CallActivity":
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = true;
              break;
          }

          // if (this.element.type == "bpmn:StartEvent") {
          //   this.selecetElementisStartEvent = true;
          //   this.selecetElementisUserTask = false;
          //   this.selecetElementisSignUserTask = false;
          //   return;
          // } else if (this.element.type == "bpmn:UserTask" && isSequential) {
          //   this.selecetElementisStartEvent = false;
          //   this.selecetElementisUserTask = false;
          //   this.selecetElementisSignUserTask = true;
          //   return;
          // } else if (this.element.type == "bpmn:UserTask") {
          //   this.selecetElementisStartEvent = false;
          //   this.selecetElementisUserTask = true;
          //   this.selecetElementisSignUserTask = false;
          //   return;
          // } else {
          //   // that.isDefaultShow = true;
          //   this.selecetElementisStartEvent = false;
          //   this.selecetElementisUserTask = false;
          //   this.selecetElementisSignUserTask = false;
          //   return;

          //   // that.isDefaultShow = false;//默认页面
          //   // if (this.element.businessObject.loopCharacteristics.$type) {
          //   //   this.selecetElementisSignUserTask = true;
          //   // }
          // }
          return;
        }
      });
      modeler.on("element.changed", (e) => {
        if (this.element) {
          console.log(this.element);
          console.log(this.element.type);
          this.type = this.element.type;

          if (this.element.type == "bpmn:UserTask") {
            if (this.element.businessObject.loopCharacteristics) {
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = true;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = false;

              this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = true;
              if (this.element.businessObject.loopCharacteristics.$type) {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = true;
              } else {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = false;
              }
              return;
            } else {
              this.selecetElementisUserTask = true;
            }
          }

          if (this.element.type == "bpmn:CallActivity") {
            if (this.element.businessObject.loopCharacteristics) {
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = false;
              this.selecetElementisCallActivity = true;

              this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = true;
              if (this.element.businessObject.loopCharacteristics.$type) {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = true;
              } else {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = false;
              }
              return;
            }
          }
          if (this.element.type == "bpmn:SubProcess") {
            if (this.element.businessObject.loopCharacteristics) {
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = false;
              this.selecetElementisSignUserTask = false;
              this.selecetElementisSequenceFlow = false;
              this.selecetElementisGateway = false;
              this.selecetElementisSubProcess = true;
              this.selecetElementisCallActivity = false;

              this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = true;
              if (this.element.businessObject.loopCharacteristics.$type) {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = true;
              } else {
                this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential = false;
              }
              return;
            }
          }

          this.isSerialOrParallel = this.$store.state.readUsertaskElementextensionElements.isSerialOrParallel = false;
          this.isSequential = this.$store.state.readUsertaskElementextensionElements.isSequential =
            "";

          //  if (isSequential) {
          //     //如果是串行或者并行的
          //     this.selecetElementisStartEvent = false;
          //     this.selecetElementisUserTask = false;
          //     this.selecetElementisSignUserTask = true;
          //   }
          // console.log(this.$store.state.readUsertaskElementextensionElements.isSequential);
        }
        const { element } = e;

        const { element: currentElement } = this;
        if (!currentElement) {
          return;
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element;
        }
      });
    },
    setDefaultProperties() {
      //默认显示
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
    /**
     * 改变控件触发的事件
     * @param { Object } input的Event
     * @param { String } 要修改的属性的名称
     */

    updateName(name) {
      const { modeler, element } = this;
      const modeling = modeler.get("modeling");
      modeling.updateLabel(element, name);
    },

    changeEventType(event) {
      console.log(event);
      const { modeler, element } = this;
      const value = event.target.value;
      const bpmnReplace = modeler.get("bpmnReplace");
      this.eventType = value;
      bpmnReplace.replaceElement(element, {
        type: element.businessObject.$type,
        eventDefinitionType: value,
      });
    },
    changeTaskType(event) {
      console.log(event);
      const { modeler, element } = this;
      const value = event.target.value;
      const bpmnReplace = modeler.get("bpmnReplace");
      bpmnReplace.replaceElement(element, {
        type: value,
      });
    },
    /**
     * 更新元素属性
     * @param { Object } 要更新的属性, 例如 { name: '' }
     */
  },
  computed: {
    isEvent() {
      const { element } = this;
      return this.verifyIsEvent(element.type);
    },
    isTask() {
      const { element } = this;
      return this.verifyIsTask(element.type);
    },
  },
};
</script>

<style scoped>
</style>
