<template>
  <div class="default-properties-panel">
    <p class="title">流程根元素:</p>
    <el-collapse :value="['1', '2']">
      <el-collapse-item name="1">
        <template slot="title" name="1">
          <span class="GeneralProperties processPanel">常规属性</span>
        </template>
        <div>
          <div class="element-item clearfix">
            <span>主键：</span>
            <span class="elementId processNodeID">{{ element.id }}</span>
          </div>
          <div class="element-item clearfix">
            <span>名称：</span>
            <input
              class="elementName processNodeName"
              :value="element.businessObject.name"
              @change="(event) => changeField(event, 'name')"
              @blur="(event) => checkValue(event)"
            />
          </div>
          <div class="element-item clearfix">
            <span class="descriptionLabel processNodeDescription">描述：</span>
            <textarea
              class="processNodeDescriptionTextarea"
              :value="documentation"
              @change="(event) => addElement(event, 'description')"
            />
          </div>
          <div class="element-item clearfix">
            <span>是否可执行：</span>
            <el-radio
              v-model="isExecutable"
              label="1"
              @change="changeIsExecutable('1')"
              >是</el-radio
            >
            <el-radio
              v-model="isExecutable"
              label="0"
              @change="changeIsExecutable('0')"
              >否</el-radio
            >
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title" name="2">
          <span class="GeneralProperties processNodePanel">通用设置</span>
        </template>
        <div>
          <div class="element-item clearfix">
            <span>业务类型：</span>
            <input
              class="elementBusinessType processBusinessType"
              :value="businessType"
              @focus="businessTypeDialogVisible = true"
            />
            <el-dialog
              title="提示"
              :visible.sync="businessTypeDialogVisible"
              width="30%"
              center
            >
              <span>需要注意的是内容是默认不居中的</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="businessTypeDialogVisible = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="businessTypeDialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
          <div class="element-item clearfix">
            <span>单位：</span>
            <input
              class="elementUnitId processUnitId"
              :value="unitId"
              @focus="unitIdDialogVisible = true"
            />
            <el-dialog
              title="提示"
              :visible.sync="unitIdDialogVisible"
              width="30%"
              center
            >
              <span>需要注意的是内容是默认不居中的</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="unitIdDialogVisible = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="unitIdDialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
          <div class="element-item clearfix">
            <span>部门：</span>
            <input
              class="elementDepartmentId processDepartmentId"
              :value="departmentId"
              @focus="departmentIdDialogVisible = true"
            />
            <el-dialog
              title="提示"
              :visible.sync="departmentIdDialogVisible"
              width="30%"
              center
            >
              <span>需要注意的是内容是默认不居中的</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="departmentIdDialogVisible = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="departmentIdDialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
          <div class="element-item clearfix">
            <span class="isDefaultProcessSpan">是否默认：</span>
            <el-radio
              v-model="defaultProcess"
              label="1"
              @change="changedefaultProcess('1')"
              >是</el-radio
            >
            <el-radio
              v-model="defaultProcess"
              label="0"
              @change="changedefaultProcess('0')"
              >否</el-radio
            >
          </div>
          <div class="element-item clearfix">
            <span>是否为子流程：</span>
            <el-radio v-model="callable" label="1" @change="changecallable('1')"
              >是</el-radio
            >
            <el-radio v-model="callable" label="0" @change="changecallable('0')"
              >否</el-radio
            >
          </div>
          <div class="element-item clearfix isRejectParentProcess">
            <p>允许子流程驳回到主流程：</p>
            <el-radio
              v-model="rejectParentProcess"
              label="1"
              @change="changerejectParentProcess('1')"
              >是</el-radio
            >
            <el-radio
              v-model="rejectParentProcess"
              label="0"
              @change="changerejectParentProcess('0')"
              >否</el-radio
            >
          </div>
          <div class="element-item clearfix isRejectGatewayBefore">
            <p>允许驳回到网关发起前：</p>
            <el-radio
              v-model="rejectGatewayBefore"
              label="1"
              @change="changerejectGatewayBefore('1')"
              >是</el-radio
            >
            <el-radio
              v-model="rejectGatewayBefore"
              label="0"
              @change="changerejectGatewayBefore('0')"
              >否</el-radio
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// import extendsTab from "../tabs/extends";
// import watcherTab from "../tabs/watcher";
export default {
  data: () => {
    return {
      element: "",
      storeModuler: null,
      modeling: null,
      elementRegistry: null,
      bpmnFactory: null,
      documentation: "",
      extensions: null,
      activeNames: ["1"], //手风琴
      isExecutable: "1", //是否可执行
      businessType: "",
      businessTypeDialogVisible: false, //业务类型dialog
      unitId: "",
      unitIdDialogVisible: false, //业务类型dialog
      departmentId: "",
      departmentIdDialogVisible: false, //业务类型dialog
      defaultProcess: "0", //是否默认
      callable: "0", //是否为子流程
      rejectParentProcess: "0", //是否允许子流程驳回到主流程
      rejectGatewayBefore: "0", //是否允许驳回到网关发起前
    };
  },
  components: {
    // extendsTab,
    // watcherTab,
  },
  created() {
    this.printDefaultElement();
    this.initModels();
  },
  methods: {
    printDefaultElement() {
      // console.log(this.StartElement)
    },
    initModels() {
      this.storeModuler = this.$store.state.moduler;
      this.elementRegistry = this.storeModuler.get("elementRegistry");
      let elementList = this.elementRegistry.getAll();
      elementList.forEach((item) => {
        if (item.type == "bpmn:Process") {
          this.element = item;
          return;
        }
      });
      this.modeling = this.storeModuler.get("modeling");
      this.bpmnFactory = this.storeModuler.get("bpmnFactory");
      this.moddle = this.storeModuler.get("moddle"); //创建标签
      console.log(this.element);
      //描述
      if (this.element.businessObject.documentation[0]) {
        this.documentation = this.element.businessObject.documentation[0].text;
      }
      //是否可执行
      if (this.element.businessObject.isExecutable) {
        this.isExecutable = "1";
      } else {
        this.setisExecutable();
      }
      //业务类型、单位、部门
      if (this.element.businessObject.extensionElements) {
        if (this.element.businessObject.extensionElements.values) {
          this.element.businessObject.extensionElements.values.forEach(
            (item) => {
              if (item.$type == "flowable:businessType") {
                this.businessType = item.$body;
              }
              if (item.$type == "flowable:unitId") {
                this.unitId = item.$body;
              }
              if (item.$type == "flowable:departmentId") {
                this.departmentId = item.$body;
              }
              if (item.$type == "flowable:defaultProcess") {
                item.$body
                  ? (this.defaultProcess = "1")
                  : (this.defaultProcess = "0");
              }
              if (item.$type == "flowable:callable") {
                item.$body ? (this.callable = "1") : (this.callable = "0");
              }
              if (item.$type == "flowable:rejectParentProcess") {
                item.$body
                  ? (this.rejectParentProcess = "1")
                  : (this.rejectParentProcess = "0");
              }
              if (item.$type == "flowable:rejectGatewayBefore") {
                item.$body
                  ? (this.rejectGatewayBefore = "1")
                  : (this.rejectGatewayBefore = "0");
              }
            }
          );
          this.extensions = this.element.businessObject.extensionElements;
        } else {
          this.createExtensionElements();
        }
      }
    },
    createExtensionElements() {
      this.extensions = this.moddle.create("bpmn:ExtensionElements", {
        values: [],
      });
      //业务类型、单位、部门
      let businessTypeOption = this.moddle.create("flowable:businessType", {
        value: this.businessType,
      });
      let unitIdOption = this.moddle.create("flowable:unitId", {
        value: this.unitId,
      });
      let departmentIdOption = this.moddle.create("flowable:departmentId", {
        value: this.departmentId,
      });
      let defaultProcessOption = this.moddle.create("flowable:defaultProcess", {
        value: "false",
      });
      let callableOption = this.moddle.create("flowable:callable", {
        value: "false",
      });
      let rejectParentProcessOption = this.moddle.create(
        "flowable:rejectParentProcess",
        {
          value: "false",
        }
      );
      let rejectGatewayBeforeOption = this.moddle.create(
        "flowable:rejectGatewayBefore",
        {
          value: "false",
        }
      );
      this.extensions.values.push(businessTypeOption);
      this.extensions.values.push(unitIdOption);
      this.extensions.values.push(departmentIdOption);
      this.extensions.values.push(defaultProcessOption);
      this.extensions.values.push(callableOption);
      this.extensions.values.push(rejectParentProcessOption);
      this.extensions.values.push(rejectGatewayBeforeOption);
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
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
    checkValue(e){
      if(e.target.value == ""){
        alert("名称不能为空")
        e.target.focus()
      }
    },
    addElement(event, type) {
      console.log(this.element);
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
      element.description = value;
      const documentation = this.bpmnFactory.create("bpmn:Documentation", {
        text: value,
      });
      // const documentation = this.modeling.createElement("bpmn:Documentation", {
      //   "text": this.documentation,
      // });
      // console.log(this.bpmnFactory);
      // let modeling = this.storeModuler.get("modeling");
      this.modeling.updateProperties(this.element, {
        documentation: [documentation],
      });
      console.log(this);
      console.log(this.element);
    },
    setisExecutable() {
      this.isExecutable = "1";
      this.modeling.updateProperties(this.element, {
        isExecutable: "true",
      });
    },
    changeIsExecutable(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.isExecutable = val;
      this.modeling.updateProperties(this.element, {
        isExecutable: value,
      });
    },
    changedefaultProcess(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:defaultProcess") {
          item.value = item.$body = value;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensions: this.extensions,
      });
    },
    changecallable(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:callable") {
          item.value = item.$body = value;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensions: this.extensions,
      });
    },
    changerejectParentProcess(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:rejectParentProcess") {
          item.value = item.$body = value;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensions: this.extensions,
      });
    },
    changerejectGatewayBefore(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:rejectGatewayBefore") {
          item.value = item.$body = value;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensions: this.extensions,
      });
    },
    updateProperties(properties) {
      //元素属性与面板产生联系
      const { modeler, element } = this;
      // let modeling = this.storeModuler.get("modeling");
      this.modeling.updateProperties(element, properties);
    },
  },
  watch: {
    isExecutable() {

    },
  },
};
</script>
<style scoped>
span{
  float: left;
  font-weight: bold;
}
p{
  font-weight: bold;
  text-align: left;
}
.element-item:first-child{
  margin-left: 20px;
}
.processBusinessType{
  width: 69%;
}
.isDefaultProcessSpan{
  width: 42%;
  text-align: left;
}
.isRejectParentProcess label,.isRejectGatewayBefore label{
  display: inline-block;
  width: 28%;
  text-align: center;
}
</style>