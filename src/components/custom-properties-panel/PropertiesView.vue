<template>
  <div class="custom-properties-panel">
    <!-- <defaultShow
      :StartElement="DefaultElement"
      v-if="isDefaultShow"
    ></defaultShow> -->
    <StartPropertiesPanel
      v-if="selecetElementisStartEvent"
    ></StartPropertiesPanel>
    <UserTaskPropertiesPanel
      v-if="selecetElementisUserTask"
    ></UserTaskPropertiesPanel>
  </div>
</template>

<script>
import { START_EVENT } from "bpmn-js/lib/features/replace/ReplaceOptions.js";
import defaultShow from "../show/defaultShow";
import StartPropertiesPanel from "../show/StartEventPropertiesPanel";
import UserTaskPropertiesPanel from "../show/UserTaskPropertiesPanel";

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

      selecetElementisStartEvent: false,
      selecetElementisUserTask: false,

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
        console.log(this.element);

        this.$store.state.selectElement = e.newSelection[0];
        //如果点击的背景 this.element = undefined

        if (this.element) {
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
          console.log("点击了" + this.element.type + "元素");

          switch (this.element.type) {
            case "bpmn:StartEvent":
              this.selecetElementisStartEvent = true;
              this.selecetElementisUserTask = false;
 console.log(this.element.businessObject);
              break;
            case "bpmn:UserTask":
              this.selecetElementisStartEvent = false;
              this.selecetElementisUserTask = true;
              break;
          }

          // that.isDefaultShow = false;
        } else {
          that.isDefaultShow = true;
          this.selecetElementisStartEvent = false;
          this.selecetElementisUserTask = false;
        }
        this.setDefaultProperties();
      });
      modeler.on("element.changed", (e) => {
        console.log(this.element);
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
