<template>
  <div>
    <el-collapse :value="['1', '2']">
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
        <template slot="title" name="1">
          <span class="PerpsonProperties">人员设置</span>
        </template>
        <div class="element-item">
          <span>分配方式：</span>
          <el-radio
            v-model="radio"
            label="0"
            @change="SelectAssignee('notAssign')"
            >不指定</el-radio
          >
          <el-radio v-model="radio" label="1" @change="SelectAssignee('assign')"
            >指定</el-radio
          >

          <div class="controlSelectAssigneeDiv" v-if="controlSelectAssignee">
            <span>请选择指定的分配方式：</span>
            <el-select
              v-model="selectResult"
              placeholder="请选择指定的分配方式"
              @change="changeSelectAssignee(selectResult)"
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
      <!-- <el-collapse-item title="审批设置" name="3"> </el-collapse-item> -->
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
      radio: "0", //人员设置指定和不指定的单选框
      // SelectSpeifyClassification: false, //控制弹框
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
    },

    //读取xml中标签的信息
    setDefaultProperties() {
      //默认显示
      if (this.element.businessObject.extensionElements) {
        //暂时这么写，如果xml中有元素信息
        this.$store.state.readUsertaskElementextensionElements.userDetail = this.element.businessObject.extensionElements;
      }
      //元素所有的属性
      let ElementObject = this.element.businessObject;
      //元素所有extensionElements，包含
      let userDetail = this.$store.state.readUsertaskElementextensionElements
        .userDetail;

      console.log(ElementObject);
      console.log(userDetail);

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
        // console.log(9999999999999999999999);
      }
      this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult;
      // console.log(this.controlSelectAssignee);
      // console.log(this.element.businessObject.$attrs.IsSelectAssignee);

      // this.$store.state.readUsertaskElementextensionElements.userDetail =
      //   ElementextensionElements.extensionElements;
      // console.log(ElementextensionElements.extensionElements);

      // //如果没有就跳出，可能丢失可能
      // if (!ElementextensionElements.extensionElements) {
      //   return;
      // }
      // //如果传进的元素默认有extensionElements
      // if (ElementextensionElements.extensionElements) {
      //   //第一次都有
      //   //如果没有就添加，如果有就不做任何
      //   if (this.extensionElementsContents) {
      //     let extensionElementsArr =
      //       ElementextensionElements.extensionElements.values; //标签数组

      //     extensionElementsArr.forEach((item) => {
      //       console.log(item);
      //       let temp = item.$body || item.value;
      //       this.extensionElementsContents.push(temp);
      //     });
      //     console.log(this.extensionElementsContents);
      //     this.$store.state.readUsertaskElementextensionElements.user = this.extensionElementsContents;
      //     this.$store.state.readUsertaskElementextensionElements.selectResult = this.extensionElementsContents[0];
      //   }

      //   console.log(this.extensionElementsContents);
      //   console.log(
      //     this.$store.state.readUsertaskElementextensionElements.user
      //   );
      //   console.log(
      //     this.$store.state.readUsertaskElementextensionElements.selectResult
      //   );

      //   //点击元素后再点击别处，元素属性有丢失情况，所以把属性存起来，取值的时候
      //   //ElementextensionElements.extensionElements.values[0].$body || this.$store.state.readUsertaskElementextensionElements.selectResult
      //   //  this.extensionElementsContents = this.$store.state.readUsertaskElementextensionElements.user;
      //   this.selectResult =
      //     ElementextensionElements.extensionElements.values[0].$body ||
      //     this.$store.state.readUsertaskElementextensionElements.selectResult;

      //   console.log(this.selectResult);
      //   //分配方式【USER ORG ROLE OPTIONS】
      //   let payload = {
      //     selectResult: this.selectResult,
      //     values: this.extensionElementsContents,
      //   };
      //   this.$store.commit("addUserExtensionElements", payload);

      //   switch (this.selectResult) {
      //     case "USER":
      //       this.initAssigneeOption(this.extensionElementsContents); //初始化分配方式
      //   }

      //   console.log(this.extensionElementsContents);

      //   // console.log()
      // }
    },
    initAssigneeOption(optionElementlist) {
      //进入页面添加元素
      // this.bpmnFactory = this.storeModuler.get("bpmnFactory");
      // const moddle = this.storeModuler.get("moddle");
      // this.extensions = moddle.create("bpmn:ExtensionElements", {
      //   values: [],
      // });
      // optionElementlist.forEach((item) => {
      //   console.log(item);
      //   let assigneeOption = this.moddle.create("flowable:assigneeOption", {
      //     value: item,
      //   });
      //   this.extensions.values.push(assigneeOption);
      // });
    },
    verifyIsEvent(type) {
      return type.includes("Event");
    },
    verifyIsTask(type) {
      return type.includes("Task");
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
        this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult =
          ""; //清空store，准备下次赋值
        return;
        // this.reelect = true;
      }
    },
    changeSelectAssignee(val) {
      // this.selectResult = val
      // this.reelect = true;
      // this.element.businessObject.extensionElements = null; //多余元素清空
      // this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult =
      //   ""; //清空store，准备下次赋值
      // this.bpmnFactory = this.storeModuler.get("bpmnFactory");
      // const moddle = this.storeModuler.get("moddle");
      // this.extensions = moddle.create("bpmn:ExtensionElements", {
      //   values: [],
      // });
    },
    //展现面板
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
      this.createdUSERelements(selected);
    },
    createdUSERelements(selected) {
      //默认多选和固定是false
      if (selected == "USER") {
        //如果他是USER并且只有一项，则默认增加两项false
     
        let length =  this.$store.state.readUsertaskElementextensionElements.elementObject
            .extensionElements.values.length;
        console.log(this.$store.state.readUsertaskElementextensionElements.elementObject
            .extensionElements);
        if (length == 1) {
          console.log(99999999999999);
        //   let assigneeOptionMultiUser = this.moddle.create(
        //     "flowable:multiUser",
        //     {
        //       value: "false",
        //     }
        //   );
        //   let assigneeOptionFixed = this.moddle.create("flowable:fixed", {
        //     value: "false",
        //   });
        //   this.extensions.values.push(assigneeOptionMultiUser);
        //   this.extensions.values.push(assigneeOptionFixed);
        //   this.modeling.updateProperties(this.element, {
        //     extensionElements: this.extensions,
        //   });
        //   this.$store.state.readUsertaskElementextensionElements.elementObject = this.element.businessObject;
        //   length = this.element.businessObject.extensionElements.values.length;
        // console.log(length)
        // console.log(this.extensions.values)
        //   console.log(this.$store.state.readUsertaskElementextensionElements.elementObject
        //     .extensionElements);
        }
      }
    },
    updateProperties(properties) {
      console.log(this);
      const { modeling, element } = this;
      //   const modeling = modeler.get("modeling");
      modeling.updateProperties(element, properties);
    },
  },
  watch: {
    selectResult(newVal, oldVal) {
      console.log(newVal, oldVal);
      //新建的时候
      //创建 ExtensionElements 和 flowable:assigneeOption
      this.extensions = this.moddle.create("bpmn:ExtensionElements", {
        values: [],
      });
      //   //  const props = moddle.create("camunda:Properties", { values: [] });
      //   //  let content = `<![CDATA[${this.selectResult}]]>`//不识别
      let assigneeOption = this.moddle.create("flowable:assigneeOption", {
        value: newVal,
        // value: content,
      });
      this.extensions.values.push(assigneeOption);

      // 更新
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
      console.log(this.element.businessObject);

      //把分配方式保存起来，这样读取的时候就是保存的分配方式
      this.$store.state.readUsertaskElementextensionElements.selectResult = newVal;
      this.$store.state.readUsertaskElementextensionElements.elementObject = this.element.businessObject;
      //根据选中的分配方式，展现不同的面板
      this.showDetails(this.selectResult);
    },
    // selectResult(newVal, oldval) {
    //   // this.selectResult = newVal
    //   // this.element.businessObject.extensionElements = null; //多余元素清空
    //   //   this.selectResult = this.$store.state.readUsertaskElementextensionElements.selectResult =
    //   //     ""; //清空store，准备下次赋值

    //   // console.log(this.element.businessObject.extensionElements.values[0].value)
    //   const moddle = this.storeModuler.get("moddle");
    //   this.extensions = moddle.create("bpmn:ExtensionElements", {
    //     values: [],
    //   });
    //   let assigneeOption = moddle.create("flowable:assigneeOption", {
    //     value: this.selectResult,
    //     // value: content,
    //   });
    //   this.extensions.values.push(assigneeOption);
    //   console.log(this.extensions);

    //   // if (!this.extensions.values) {

    //   // }
    //   // this.extensions.values[0] = assigneeOption;

    //   // this.selectResult = this.element.businessObject;
    //   let ElementextensionElements = this.element.businessObject
    //     .extensionElements;
    //   if (ElementextensionElements) {
    //     for (let keys in ElementextensionElements) {
    //       if (keys == "values") {
    //         ElementextensionElements["values"][0].value = this.selectResult;
    //       }
    //     }
    //   }
    //   this.$store.state.readUsertaskElementextensionElements.selectResult = this.selectResult;
    //   // console.log(this.element.businessObject.extensionElements);
    //   this.showDetails(this.selectResult);
    // },
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
</style>>