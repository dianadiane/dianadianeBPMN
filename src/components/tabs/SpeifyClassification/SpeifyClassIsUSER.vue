<template>
  <div class="clearfix">
    <hr />
    <div class="isMultiUser">
      <span>是否多选：</span>
      <el-radio v-model="isMultiUser" label="1">是</el-radio>
      <el-radio v-model="isMultiUser" label="0">否</el-radio>
    </div>

    <div class="isFixed">
      <span>是否固定：</span>
      <el-radio v-model="isFixed" label="1">是</el-radio>
      <el-radio v-model="isFixed" label="0">否</el-radio>
    </div>

    <el-button
      v-if="!chosePeople"
      class="pleaseChosePeople"
      size="small"
      @click="chosePeopleList('choisePlease')"
      >请选择人员</el-button
    >
    <el-button
      v-if="chosePeople"
      class="pleaseChosePeople"
      size="small"
      @click="chosePeopleList('reChoise')"
      >重新选择</el-button
    >

    <div class="trans" v-if="centerDialogVisible">
      <el-dialog
        title="请选择人员"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        class="clearfix"
      >
        <!-- <div style="text-align: center clearfix"> -->
        <div class="dialogLeft">
          <el-input placeholder="查找" v-model="filterText" class="serachInput">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree"
          >
          </el-tree>
        </div>
        <div class="dialogRight">
          <a-transfer
            :data-source="mockData"
            show-search
            :list-style="{
              width: '41%',
              height: '380px',
            }"
            :operations="['', '']"
            :target-keys="targetKeys"
            :render="(item) => `${item.title}-${item.description}`"
            @change="handleChange"
          >
            <!-- <a-button
              slot="footer"
              size="small"
              style="float: right; margin: 5px"
              @click="getMock"
            >
              reload
            </a-button>
            <span slot="notFoundContent"> 没数据 </span> -->
          </a-transfer>
        </div>
        <!-- </div> -->
        <span slot="footer" class="dialog-footer clearfix">
          <el-button
            type="primary"
            @click="changeCenterDialogVisible('confirm')"
            >确 定</el-button
          >
          <el-button @click="changeCenterDialogVisible">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="chosePeople">
      <h5>已选择名单</h5>
      <!-- <ul class="choseListUl" v-if="defaultShowPeopleList">
        <li class="choseList">
          {{ chosePeopleResult }}
        </li>
      </ul> -->
      <ul class="choseListUl">
        <li class="choseList" v-for="(item, i) in chosePeopleResult" :key="i">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- <el-button class="saveMessage" size="small" :plain="true" @click="open">保存信息</el-button> -->
    <!-- <el-button size="small">清空</el-button> -->
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  props: {
    reelect: null, //父级按过重新选择的按钮
  },
  data() {
    return {
      storeModuler: null,
      modeler: null,
      moddle: null,
      modeling: null,
      bpmnFactory: null,
      elementRegistry: null,
      defaultElement: null,
      element: null,
      extensions: {}, //{values:[[],[],[],[]]}
      extensionsList: [
        "flowable:assigneeOption",
        "flowable:editForm",
        "flowable:requireOpinion",
        "flowable:showApproveRecord",
        "flowable:rejectable",
        "flowable:sendCopy",
        "flowable:multiUser",
        "flowable:fixed",
        "flowable:userValue",
      ],
      //是否多选
      isMultiUser: "", //"",0,1
      IsMultiUserValue: "", //"",true,false
      // 是否固定
      isFixed: "",
      IsFixedValue: "",
      centerDialogVisible: false,
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      filterText: "",
      selectRightDialogDate: null,
      //穿梭框
      mockData: [], //左侧请求的数据[{description:zhangsan2,{key:0},{title:zhangsan2}}]
      targetKeys: [], //右侧选择的数据
      //showChosePeopleResult
      defaultShowPeopleList: "",
      chosePeople: false,
      chosePeopleResult: [],

      repetition: false, //元素是否重复
    };
  },
  created() {
    this.getMock();
    this.init();
  },
  methods: {
    init() {
      this.element = this.$store.state.selectElement;
      this.storeModuler = this.$store.state.moduler;

      this.elementRegistry = this.storeModuler.get("elementRegistry");
      this.modeling = this.storeModuler.get("modeling"); //更新方法
      this.bpmnFactory = this.storeModuler.get("bpmnFactory");
      this.moddle = this.storeModuler.get("moddle"); //创建标签

      this.defaultElement = this.$store.state.readUsertaskElementextensionElements.userDetail;
      console.log(this.defaultElement);
      this.extensions = this.defaultElement;
      this.initIsMultiUser();
      this.initIsFixed();
      this.initPeopleList();
      this.filtrate();
    },
    //初始化IsMultiUserAndIsFixe
    initIsMultiUser() {
      //先拿store中的值，拿到就赋值,没有就是默认的页面中默认的""
      let IsMultiUser = this.$store.state.readUsertaskElementextensionElements
        .isMultiUser; //true和false
      switch (IsMultiUser) {
        case "true":
          this.isMultiUser = "1";
          this.IsMultiUserValue = "true";
          break;
        case "false":
          this.isMultiUser = "0";
          this.IsMultiUserValue = "false";
          break;
      }
      let assigneeOptionMultiUser = this.moddle.create("flowable:multiUser", {
        value: this.IsMultiUserValue,
      });
      //如果有则不push 后期优化
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:multiUser") {
          this.repetition = true;
          return;
        }
      });
      //重复了
      if (!this.repetition) {
        this.extensions.values.push(assigneeOptionMultiUser);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;
    },
    initIsFixed() {
      let isFixed = this.$store.state.readUsertaskElementextensionElements
        .isFixed; //true和false
      console.log(isFixed);
      switch (isFixed) {
        case "true":
          this.isFixed = "1";
          this.IsFixedValue = "true";
          break;
        case "false":
          this.isFixed = "0";
          this.IsFixedValue = "false";
          break;
      }
      let assigneeOptionIsFixed = this.moddle.create("flowable:fixed", {
        value: this.IsFixedValue,
      });
      //如果有则不push
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:fixed") {
          this.repetition = true;
          return;
        }
      });
      if (!this.repetition) {
        this.extensions.values.push(assigneeOptionIsFixed);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;
    },
    initPeopleList() {
      //"zhangsan,zhangsi,zhangwu"
      let defaultPeopleList = this.$store.state
        .readUsertaskElementextensionElements.chosePeopleList;
      if (defaultPeopleList) {
        this.chosePeople = true;
      }
      let assigneeuserValue = this.moddle.create("flowable:userValue", {
        value: defaultPeopleList,
      });
      //如果有则不push
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:userValue") {
          this.repetition = true;
          return;
        }
      });
      if (!this.repetition) {
        this.extensions.values.push(assigneeuserValue);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;
      this.chosePeopleResult = defaultPeopleList.split(",");
    },
    filtrate() {//想筛选数据
      // let values = [];
      // this.extensions.values.filter((item) => {
      //   this.extensionsList.forEach((listItem) => {
      //     if (item.$type == listItem) {
      //       values.push(item);
      //     }
      //   });
      // });
      // console.log(new Set(values));
      // // this.extensionsList.forEach((listItem) => {
      //   this.extensions.values.filter((item) => {
      //     console.log(listItem+"----"+item.$type)
      //     item.$type !== listItem;
      //   });
      // });
      // console.log(this.extensions);
    },
    handleNodeClick(data) {
      //tree方法
      console.log(data);
    },

    chosePeopleList(isChoisePlease) {
      //传进来是重新选择 还是请选择
      this.centerDialogVisible = true;
      // if(isChoisePlease=="choisePlease"){

      // }
      if (isChoisePlease == "reChoise") {
        this.defaultShowPeopleList = [];
      }
    },
    //向右筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //   //穿梭框
    getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `zhangsan${i + 1}`,
          description: `zhangsan${i + 1}`,
          // chosen: Math.random() * 2 > 1,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
      // console.log(this.mockData, this.targetKeys);
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    //   //dialog
    changeCenterDialogVisible(message) {
      let UnprocessedData = []; //未处理数据
      this.centerDialogVisible = false;
      if (message == "confirm") {
        this.chosePeople = true;
        for (let key in this.targetKeys) {
          UnprocessedData.push(this.mockData[this.targetKeys[key]].title);
        }
      }
      //chosePeopleResult = [zhangsan,zhangsi,zhangwu]
      this.chosePeopleResult = UnprocessedData;
      //value = "zhangsan,zhangsi,zhangwu"
      let value = this.chosePeopleResult.join(",");
      this.$store.state.readUsertaskElementextensionElements.chosePeopleList = this.IsMultiUserValue;

      let assigneeuserValue = this.moddle.create("flowable:userValue", {
        value: value,
      });
      // this.extensions.values[3] = assigneeuserValue;
      this.changeExtensions("flowable:userValue", value);
    },
    changeExtensions(type, value) {
      this.extensions.values.forEach((item) => {
        if (item.$type == type) {
          item.value = value;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
  },

  watch: {
    isMultiUser(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.$store.state.readUsertaskElementextensionElements.isMultiUser = value;
      // this.extensions.values[1].value = value;
      this.changeExtensions("flowable:multiUser", value);
      // this.modeling.updateProperties(this.element, {
      //   extensionElements: this.extensions,
      // });
    },
    isFixed(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.$store.state.readUsertaskElementextensionElements.isFixed = value;
      //  this.extensions.values[2].value = value;
      this.changeExtensions("flowable:fixed", value);
      // this.modeling.updateProperties(this.element, {
      //   extensionElements: this.extensions,
      // });
    },
  },
};
</script>
<style scoped>
div {
  padding: 0 10px 10px 10px;
}
span {
  font-weight: bold;
}
.el-button {
  float: left;
  text-align: left;
  font-weight: bold;
}
.dialogLeft {
  width: 30%;
  border-radius: 4px;
  background: #fff;
  float: left;
  vertical-align: middle;
  max-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  height: 380px;
}
.serachInput input {
  text-align: left;
  border-radius: 16px;
}

.dialogRight {
  float: left;
  width: 66%;
  margin-left: 3%;
}

.el-dialog__footer {
  overflow: hidden;
  width: 100%;
  text-align: right;
  height: 50px;
  position: relative;
  bottom: 0;
}
.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 0 25px;
  height: 66%;
}
.pleaseChosePeople {
  display: block;
  float: none;
  margin-bottom: 8px;
}
.choseList {
  text-align: left;
  margin: 8px;
}
h5 {
  margin-top: 8px;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
</style>