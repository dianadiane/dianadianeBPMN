<template>
  <div>
    <div class="element-item">
      <span>主键：</span>
      <span class="elementId StartNodeID">{{ element.id }}</span>
    </div>
    <div class="element-item">
      <span>名称：</span>
      <input
      class="elementName StartNodeName"
        :value="element.name"
        @change="(event) => changeField(event, 'name')"
      />
    </div>
    <div class="element-item">
      <span class="descriptionLabel StartNodeDescription" >描述：</span>
      <textarea
        class="StartNodeDescriptionTextarea"
        :value="documentation"
        @change="(event) => addElement(event, 'description')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // selectElement: {
    //   type: Array,
    // },
    // modeler: {
    //   type: Object,
    // },
  },
  data: () => {
    return {
      element: null,
      storeModuler: null, //bpmnModeler放在了store中
      elementRegistry: null,
      // activeTab: "base",
      // activeElementBusinessObject: {},
      documentation: "", // 元素文档 对应的字符串
      // sequenceFlowCondition: {}, // 连线条件实例（包含需要的类型字段）
      // elementListeners: [], // 扩展属性 -- 监听器实例集合
      // elementAttributes: [], // 扩展属性 -- 自定义字段属性实例集合
    };
  },
  created() {
    this.initModels();
    this.elementValueToSelf();
  },
  methods: {
    elementValueToSelf() {
      //选中元素传进来
      this.element = this.$store.state.selectElement;
      console.log(this.element);
      //元素的描述
       if(this.element.businessObject.documentation[0]){
         this.documentation=this.element.businessObject.documentation[0].text
       }
    },
    initModels() {
      this.storeModuler = this.$store.state.moduler;
      this.elementRegistry = this.storeModuler.get("elementRegistry");
      this.modeling = this.storeModuler.get("modeling");
      this.bpmnFactory = this.storeModuler.get("bpmnFactory");
    },
    changeField(event, type) {
      console.log(event); //事件类型
      console.log(this.element); //shape元素

      const value = event.target.value;
      this.element[type] = value;
      let properties = {};
      properties[type] = value;

      this.updateProperties(properties); //更新属性
    },
    addElement(event, type) {
      const shapeDoc = this.element.businessObject.documentation; // 元素文档
      this.documentation = shapeDoc && shapeDoc.length ? shapeDoc[0].text : "";
      const { modeler, element } = this;
      let value = event.target.value;
      // console.log(value);
      if (!value) {
        //如果描述的文本框没有值
        element.description = value;
        this.modeling.updateProperties(element, {
          documentation: null,
        });
        return;
      }

      console.log(this.element.businessObject);
      // console.log(shapeDoc);
      // console.log(this.documentation);
      // console.log(this.element);

      // console.log(this.elementRegistry);
      // console.log(12222);
      // console.log(event); //事件类型
      // const { modeler, element } = this;
      element.description = value;
      const documentation = this.bpmnFactory.create("bpmn:Documentation", {
        text: value,
      });
      // const documentation = this.modeling.createElement("bpmn:Documentation", {
      //   "text": this.documentation,
      // });
      // console.log(this.bpmnFactory);
      // let modeling = this.storeModuler.get("modeling");
      this.modeling.updateProperties(element, {
        documentation: [documentation],
      });
      console.log(this);
      console.log(this.element);
    },
    updateProperties(properties) {
      //元素属性与面板产生联系
      const { modeler, element } = this;
      // let modeling = this.storeModuler.get("modeling");
      this.modeling.updateProperties(element, properties);
    },
  },
};
</script>

<style scoped>
span{
  font-weight: bold;
}
</style>