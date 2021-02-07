<template>
  <div>
    <el-collapse :value="['1', '2', '3']">
      <el-collapse-item name="1">
        <template slot="title" name="1">
          <span class="GeneralProperties UserTaskPanel">常规属性</span>
        </template>

        <div class="element-item">
          <span>主键：</span>
          <span class="elementId UserTaskId">{{ element.id }}</span>
        </div>
        <div class="element-item">
          <span>名称：</span>
          <input
            class="elementName UserTaskName"
            :value="element.name"
            @change="(event) => changeField(event, 'name')"
          />
        </div>
        <div class="element-item">
          <span class="descriptionLabel UserTaskNodeDescription">描述：</span>
          <textarea
            class="UserTaskNodeDescriptionTextarea"
            :value="documentation"
            @change="(event) => addElement(event, 'description')"
          />
        </div>
        <div class="element-item">
          <span>跳过表达式：</span>
          <input
            class="UserTeskskipExpression"
            :value="skipExpressionMessage"
            @change="
              (event) => skipExpression(event, 'flowable:skipExpression')
            "
          />
        </div>
        <div class="element-item">
          <div class="block">
            <span class="demonstration">到期时间：</span>
            <el-date-picker
              class="datePicker"
              v-model="dateValue"
              @change="(event) => dueDate(event, 'flowable:dueDate')"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item name="2">
        <template slot="title" name="2">
          <span class="PerpsonProperties">人员设置</span>
        </template>
        <div class="element-item">
          <span>分配方式：</span>
          <el-radio
            v-model="assignStyle"
            label="0"
            @change="SelectAssignee('notAssign')"
            >不指定</el-radio
          >
          <el-radio
            v-model="assignStyle"
            label="1"
            @change="SelectAssignee('assign')"
            >指定</el-radio
          >

          <div class="controlSelectAssigneeDiv" v-if="controlSelectAssignee">
            <span>请选择指定的分配方式：</span>
            <el-select
              v-model="selectResult"
              placeholder="请选择分配方式"
              @change="changeSelectResult"
            >
              <el-option
                style="width: 118%"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <!-- 
          <h3 v-if="selectAssigneeSpan">
            您选择分配的方式为：{{ selectAssigneeResult }}
          </h3> -->
        </div>
        <div>
          <SpeifyClassIsUSER
            v-if="selectAssigneePanel == 'USER'"
          ></SpeifyClassIsUSER>
          <SpeifyClassIsORG
            v-if="selectAssigneePanel == 'ORG'"
          ></SpeifyClassIsORG>
          <SpeifyClassIsROLE
            v-if="selectAssigneePanel == 'ROLE'"
          ></SpeifyClassIsROLE>
          <SpeifyClassIsPOSITI
            v-if="selectAssigneePanel == 'POSITION'"
          ></SpeifyClassIsPOSITI>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title" name="3">
          <span class="PerpsonProperties">审批设置</span>
        </template>
        <div class="element-item marginLeft">
          <span>允许编辑表单：</span>
          <el-radio
            v-model="editForm"
            label="true"
            @change="approvalSet('editForm', 'true')"
            >是</el-radio
          >
          <el-radio
            v-model="editForm"
            label="false"
            @change="approvalSet('editForm', 'false')"
            >否</el-radio
          >
        </div>
        <div class="element-item">
          <span>审批意见：</span>
          <el-radio
            v-model="requireOpinion"
            label="true"
            @change="approvalSet('requireOpinion', 'true')"
            >是</el-radio
          >
          <el-radio
            v-model="requireOpinion"
            label="false"
            @change="approvalSet('requireOpinion', 'false')"
            >否</el-radio
          >
        </div>
        <div class="element-item">
          <span>显示审批记录：</span>
          <el-radio
            v-model="showApproveRecord"
            label="true"
            @change="approvalSet('showApproveRecord', 'true')"
            >是</el-radio
          >
          <el-radio
            v-model="showApproveRecord"
            label="false"
            @change="approvalSet('showApproveRecord', 'false')"
            >否</el-radio
          >
        </div>
        <div class="element-item">
          <span>审批允许驳回：</span>
          <el-radio
            v-model="rejectable"
            label="true"
            @change="approvalSet('rejectable', 'true')"
            >是</el-radio
          >
          <el-radio
            v-model="rejectable"
            label="false"
            @change="approvalSet('rejectable', 'false')"
            >否</el-radio
          >
        </div>
        <div class="element-item">
          <span>审批允许抄送：</span>
          <el-radio
            v-model="sendCopy"
            label="true"
            @change="approvalSet('sendCopy', 'true')"
            >是</el-radio
          >
          <el-radio
            v-model="sendCopy"
            label="false"
            @change="approvalSet('sendCopy', 'false')"
            >否</el-radio
          >
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="扩展">
        <extendsTab></extendsTab>
      </el-tab-pane>
      <el-tab-pane label="监听器">
        <watcherTab></watcherTab>
      </el-tab-pane> -->
    <!-- </el-tabs> -->
  </div>
</template>


<script>
import SpeifyClassIsUSER from "../tabs/SpeifyClassification/SpeifyClassIsUSER";
import SpeifyClassIsORG from "../tabs/SpeifyClassification/SpeifyClassIsORG";
import SpeifyClassIsROLE from "../tabs/SpeifyClassification/SpeifyClassIsROLE";
import SpeifyClassIsPOSITI from "../tabs/SpeifyClassification/SpeifyClassIsPOSITI";

// import conventionTab from "../tabs/convention";
// import extendsTab from "../tabs/extends";
// import watcherTab from "../tabs/watcher";
var dayjs = require("dayjs");
dayjs().format();
export default {
  props: {},
  data: () => {
    return {
      element: null,
      modeler: null,
      moddle: null,
      modeling: null,
      bpmnFactory: null,
      elementRegistry: null,
      storeModuler: null,
      activeNames: ["1", "2"], //手风琴
      skipExpressionMessage: "", //跳过表达式
      documentation: "", //描述
      dateValue: "", //日期选择器
      //人员设置面板
      assignStyle: "", //人员设置指定和不指定的单选框
      options: [
        {
          value: "USER",
          label: "人员",
        },
        {
          value: "ORG",
          label: "机构",
        },
        {
          value: "ROLE",
          label: "角色",
        },
        {
          value: "POSITION",
          label: "职位",
        },
      ],
      controlSelectAssignee: false, //是否有ExtensionElements
      extensions: {}, //{values:[[],[],[],[]]}
      selectResult: "", //人员指定选择结果
      selectAssigneePanel: "", //"USER", "ORG", "ROLE", "POSITION"选项,
      // extensionElementsContents: [], //[USER,true,true,zhangsan111]包含具体分配方式和其他选项
      // reelect: false, //按过不指定，重新选择
      //审批设置面板
      editForm: "", //允许编辑表单
      requireOpinion: "",
      showApproveRecord: "",
      rejectable: "",
      sendCopy: "",
      repetition: false,
    };
  },
  created() {
    this.elementValueToSelf();
  },
  components: {
    SpeifyClassIsUSER, //分配方式是人员
    SpeifyClassIsORG,
    SpeifyClassIsROLE,
    SpeifyClassIsPOSITI,
    // conventionTab,
    // extendsTab,
    // watcherTab,
  },
  methods: {
    //常规属性
    elementValueToSelf() {
      //元素属性传进来
      this.element = this.$store.state.selectElement;
      this.storeModuler = this.$store.state.moduler;

      this.elementRegistry = this.storeModuler.get("elementRegistry");
      this.modeling = this.storeModuler.get("modeling"); //更新方法
      this.bpmnFactory = this.storeModuler.get("bpmnFactory");
      this.moddle = this.storeModuler.get("moddle"); //创建标签

      console.log(this.element.businessObject); //标签所有属性
      this.$store.state.readUsertaskElementextensionElements.elementObject = this.element.businessObject;
      this.setDefaultProperties();
      this.createExtensionElements();
    },
    //首先创建标签
    createExtensionElements() {
      this.extensions = this.moddle.create("bpmn:ExtensionElements", {
        values: [],
      });
      let assigneeOption = this.moddle.create("flowable:assigneeOption", {
        value: this.selectResult,
        // value: content,
      });
      //允许编辑表单
      let editFormOption = this.moddle.create("flowable:editForm", {
        value: this.editForm,
      });
      let requireOpinionOption = this.moddle.create("flowable:requireOpinion", {
        value: this.requireOpinion,
      });
      let showApproveRecordOption = this.moddle.create(
        "flowable:showApproveRecord",
        {
          value: this.showApproveRecord,
        }
      );
      let rejectableOption = this.moddle.create("flowable:rejectable", {
        value: this.rejectable,
      });
      let sendCopyOption = this.moddle.create("flowable:sendCopy", {
        value: this.sendCopy,
      });
      this.extensions.values.push(assigneeOption);
      this.extensions.values.push(editFormOption);
      this.extensions.values.push(requireOpinionOption);
      this.extensions.values.push(showApproveRecordOption);
      this.extensions.values.push(rejectableOption);
      this.extensions.values.push(sendCopyOption);
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
    //读取xml中标签的信息
    setDefaultProperties() {
      //默认显示
      console.log(this.element.businessObject.extensionElements);
      //先判断是否有其他标签

      // this.$store.state.readUsertaskElementextensionElements.userDetail
      //   ? (this.$store.state.readUsertaskElementextensionElements.userDetail = this.element.businessObject.extensionElements)
      //   : null;
      //元素所有的属性
      let ElementObject = this.element.businessObject;
      //元素所有extensionElements，包含
      // let userDetail = this.$store.state.readUsertaskElementextensionElements
      //   .userDetail;
      //描述，如果有描述就赋值
      if (this.element.businessObject.documentation[0]) {
        this.documentation = this.element.businessObject.documentation[0].text;
      }
      //跳过表达式
      this.skipExpressionMessage =
        ElementObject.$attrs["flowable:skipExpression"];
      //日期
      this.dateValue = dayjs(ElementObject.$attrs["flowable:dueDate"]).format(
        "YYYY/MM/DD"
      );
      //是否有指定
      //传进来的xml是否有指定分配方式
      this.controlSelectAssignee = ElementObject.$attrs.IsSelectAssignee;
      if (this.controlSelectAssignee) {
        this.radio = "1"; //单选框为指定
        let properties = [];
        properties["IsSelectAssignee"] = true; //改变标签IsSelectAssignee属性
        this.updateProperties(properties);
      }
      this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult;
      if (!this.element.businessObject.extensionElements) {
        return;
      }
      // console.log(this.$store.state.readUsertaskElementextensionElements.selectResult)
      // this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult
      // console.log(ElementObject);
      // console.log(userDetail);
      //然后判断是否有第二项，第一项为分配方式，一直会有
      if (this.element.businessObject.extensionElements.values[1]) {
        //暂时这么写，如果xml中有元素信息
        console.log(88888888888888888888888888888888888888);
        //只存信息，不创建标签，在每一个组件中创建标签
        this.element.businessObject.extensionElements.values.forEach((item) => {
          //  分配方式
          if (item.$type == "flowable:assigneeOption") {
            this.$store.state.readUsertaskElementextensionElements.selectResult =
              item.$body || item.value;
            this.selectResult = item.$body || item.value;
          }
          //选择是人员（三个选择：是否多人，是否固定，选择人员）
          if (item.$type == "flowable:multiUser") {
            //是否多人
            this.$store.state.readUsertaskElementextensionElements.isMultiUser =
              item.$body || item.value;
          }
          if (item.$type == "flowable:fixed") {
            //是否固定
            this.$store.state.readUsertaskElementextensionElements.isFixed =
              item.$body || item.value;
          }
          if (item.$type == "flowable:userValue") {
            //选择人员
            this.$store.state.readUsertaskElementextensionElements.chosePeopleList =
              item.$body || item.value;
          }
          //选择机构（两个选择：机构范围，选择指定机构）
          if (item.$type == "flowable:orgScope") {
            //机构范围
            this.$store.state.readUsertaskElementextensionElements.orgScope =
              item.$body || item.value;
          }
          if (item.$type == "flowable:orgvalue") {
            //选择指定机构
            this.$store.state.readUsertaskElementextensionElements.orgvalue =
              item.$body || item.value;
          }
          //选择角色（四个：机构范围，选择机构，选择角色，自动带出）
          if (item.$type == "flowable:roleValue") {
            //选择角色
            this.$store.state.readUsertaskElementextensionElements.roleValue =
              item.$body || item.value;
          }
          if (item.$type == "flowable:autoSelect") {
            //选择角色
            this.$store.state.readUsertaskElementextensionElements.autoSelect =
              item.$body || item.value;
          }
          // 选择职位（四个：机构范围，选择指定机构，选择岗位，是否固定）
          if (item.$type == "flowable:positionValue") {
            //选择岗位
            this.$store.state.readUsertaskElementextensionElements.positionValue =
              item.$body || item.value;
          }

          //审批面板选项
          if (item.$type == "flowable:editForm") {
            //允许编辑表单
            this.$store.state.readUsertaskElementextensionElements.editForm =
              item.$body || item.value;
            this.editForm = item.$body || item.value;
          }
          if (item.$type == "flowable:requireOpinion") {
            //审批意见
            this.$store.state.readUsertaskElementextensionElements.requireOpinion =
              item.$body || item.value;
            this.requireOpinion = item.$body || item.value;
          }
          if (item.$type == "flowable:showApproveRecord") {
            //显示审批记录
            this.$store.state.readUsertaskElementextensionElements.showApproveRecord =
              item.$body || item.value;
            this.showApproveRecord = item.$body || item.value;
          }
          if (item.$type == "flowable:rejectable") {
            //审批允许驳回
            this.$store.state.readUsertaskElementextensionElements.rejectable =
              item.$body || item.value;
            this.rejectable = item.$body || item.value;
          }
          if (item.$type == "flowable:sendCopy") {
            //审批允许抄送
            this.$store.state.readUsertaskElementextensionElements.sendCopy =
              item.$body || item.value;
            this.sendCopy = item.$body || item.value;
          }
        });
        console.log(this.element.businessObject.extensionElements);
        // this.$store.state.readUsertaskElementextensionElements.selectResult = this.element.businessObject.extensionElements.values[0].value;
      }
    },
    //名称
    changeField(event, type) {
      console.log(event);
      console.log(type);
      const value = event.target.value;
      this.element[type] = value;
      let properties = {};
      properties[type] = value;
      this.updateProperties(properties);
    },

    //描述
    addElement(event, type) {
      const { element } = this;
      let value = event.target.value;

      element.description = value;
      const documentation = this.bpmnFactory.create("bpmn:Documentation", {
        text: value,
      });
      this.modeling.updateProperties(element, {
        documentation: [documentation],
      });
      // console.log(this);
      // console.log(this.element);
    },

    //跳过表达式
    skipExpression(event, type) {
      const value = event.target.value;
      this.element.skipExpression = value;
      this.element[type] = value;
      let properties = {};
      properties[type] = value;
      this.updateProperties(properties);
    },

    //到期时间
    dueDate(event, type) {
      console.log(event); //时间
      console.log(type); //标签名
      console.log(this.element.dueDate);
      this.dateValue = event;
      this.element.dueDate = event;
      this.element[type] = event;
      let properties = {};
      properties[type] = event;
      this.updateProperties(properties);
      this.setDefaultProperties();
    },

    //是否指定方式
    SelectAssignee(IsOrNot) {
      let properties = {};
      if (IsOrNot == "assign") {
        properties["IsSelectAssignee"] = true; //改变标签IsSelectAssignee属性
        this.updateProperties(properties);
        this.radio = "1";
        this.controlSelectAssignee = true; //下面的选项控制
      }
      if (IsOrNot == "notAssign") {
        this.radio = "0";
        this.selectAssigneePanel = ""; //select的选择器
        properties["IsSelectAssignee"] = false;
        this.updateProperties(properties); //IsSelectAssignee的属性变成false
        this.controlSelectAssignee = false;
        this.extensionElementsContents = []; //默认选中peopleList的数据
        this.element.businessObject.extensionElements = null; //多余元素清空
        this.$store.state.readUsertaskElementextensionElements.isMultiUser = "";
        this.$store.state.readUsertaskElementextensionElements.isFixed = "";
        this.$store.state.readUsertaskElementextensionElements.chosePeopleList =
          "";
        this.$store.state.readUsertaskElementextensionElements.orgScope = "";
        this.$store.state.readUsertaskElementextensionElements.orgvalue = "";
        this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult =
          ""; //清空store，准备下次赋值
        return;
        // this.reelect = true;
      }
    },
    changeSelectResult() {
      this.$store.state.readUsertaskElementextensionElements.selectResult = this.selectResult;
      console.log(this.selectResult);
    },
    //审批设置面板
    approvalSet(type, value) {
      console.log(this.extensions);

      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:" + type) {
          item.value = value;
          this.$store.state.readUsertaskElementextensionElements[type] = value;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
    //根据watcher 的值决定展现面板
    showDetails(selected) {
      switch (selected) {
        case "USER":
          this.selectAssigneePanel = "USER";
          break;
        case "ORG":
          this.selectAssigneePanel = "ORG";
          break;
        case "ROLE":
          this.selectAssigneePanel = "ROLE";
          break;
        case "POSITION":
          this.selectAssigneePanel = "POSITION";
          break;
      }

      //展现面板后默认创建的标签
    },
    updateProperties(properties) {
      const { modeling, element } = this;
      modeling.updateProperties(element, properties);
    },
  },
  watch: {
    //因为组件进来之后 selectResult被赋值了，所以方法一进来就被调用了
    selectResult() {
      //新建的时候
      //创建 ExtensionElements 和 flowable:assigneeOption
      // this.extensions = this.moddle.create("bpmn:ExtensionElements", {
      //   values: [],
      // });
      //   //  const props = moddle.create("camunda:Properties", { values: [] });
      //   //  let content = `<![CDATA[${this.selectResult}]]>`//不识别
      // let assigneeOption = this.moddle.create("flowable:assigneeOption", {
      //   value: this.selectResult,
      //   // value: content,
      // });

      // //这个push没问题
      // this.extensions.values.push(assigneeOption);
      // // this.extensions.values.push(editFormOption);
      console.log(this.extensions);
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:assigneeOption") {
          item.value = this.selectResult;
        }
      });
      // // 更新
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
      this.$store.state.readUsertaskElementextensionElements.userDetail = this.extensions;
      console.log(this.element.businessObject);

      //把分配方式保存起来，这样读取的时候就是保存的分配方式
      this.$store.state.readUsertaskElementextensionElements.selectResult = this.selectResult;
      this.$store.state.readUsertaskElementextensionElements.elementObject = this.element.businessObject;
      //根据选中的分配方式，展现不同的面板
      this.showDetails(this.selectResult);
    },
  },
};
</script>

<style scoped>
.el-date-editor.datePicker {
  width: 70%;
  text-align: right;
}
.controlSelectAssigneeDiv {
  margin-top: 10px;
}
.controlSelectAssigneeDiv .el-select {
  margin-top: 5px;
}
/* 把label变成span，然后字体加粗 */
span {
  font-weight: bold;
}
.UserTeskskipExpression {
  width: 62%;
}
.element-item.marginLeft {
  margin-left: 38px;
}
</style>>