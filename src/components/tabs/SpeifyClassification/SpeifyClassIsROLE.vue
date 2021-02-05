<template>
  <div class="spifyClassIsORG clearfix">
    <hr />
    <div class="orgScope clearfix">
      <span class="title">机构范围：</span>
      <el-radio
        class="orgScopeRadio"
        v-model="orgScope"
        label="START_DEPARTMENT"
        >发起人所在部门</el-radio
      >
      <el-radio class="orgScopeRadio" v-model="orgScope" label="START_COMPANY"
        >发起人所在公司</el-radio
      >
      <el-radio class="orgScopeRadio" v-model="orgScope" label="GIVEN_ORG"
        >指定机构</el-radio
      >
    </div>
    <div class="selectUnitOrDepantment clearfix">
      <el-button
        size="small"
        :disabled="IsDisabled"
        @click="controlSelectUnitOrDepantmentDialog"
        >请选择单位或部门</el-button
      >
    </div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <!-- <a-transfer
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
            <a-button
              slot="footer"
              size="small"
              style="float: right; margin: 5px"
              @click="getMock"
            >
              reload
            </a-button>
            <span slot="notFoundContent"> 没数据 </span>
          </a-transfer> -->

        <span slot="footer" class="dialog-footer clearfix">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="selectPositions clearfix">
      <el-button size="small" @click="showPositionsList = true"
        >请选择角色</el-button
      >
    </div>
    <div class="PositionsList" v-if="showPositionsList">
      <el-dialog
        title="提示"
        :visible.sync="showPositionsList"
        width="30%"
        center
      >
        <el-checkbox-group v-model="checkList">
          <div>
            <el-checkbox label="总经理"></el-checkbox>
          </div>
          <div>
            <el-checkbox label="副经理"></el-checkbox>
          </div>
          <div>
            <el-checkbox label="职员"></el-checkbox>
          </div>
          <div>
            <el-checkbox label="禁用" disabled></el-checkbox>
          </div>
          <div>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </div>
        </el-checkbox-group>

        <span slot="footer" class="dialog-footer clearfix">
          <el-button type="primary" @click="showCheckList">确 定</el-button>
          <el-button @click="showPositionsList = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="showRoles">
      <ul>
        <li
          class="showRolesList"
          v-for="(item, index) in checkList"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="autoSelect">
      <span>自动带出：</span>
      <el-radio v-model="autoSelect" label="true">是</el-radio>
      <el-radio v-model="autoSelect" label="false">否</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeling: null,
      moddle: null,
      element: null,
      orgScope: "", //机构范围
      extensions: {}, //新增标签
      IsDisabled: true, //禁止单位或部门button
      centerDialogVisible: false, //打开单位和部门选择
      data: [
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
      //选择岗位
      showPositionsList: false,
      roleValue: "", //checkList的字符串
      // checkList: ["选中且禁用", "复选框 A"], //选择岗位
      checkList: [], //选择岗位
      showRoles: false,
      //是否固定
      autoSelect: "",
      autoSelectValue: "",
      repetition: false, //标签是否重复
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.element = this.$store.state.selectElement;
      this.storeModuler = this.$store.state.moduler;
      this.modeling = this.storeModuler.get("modeling"); //更新方法
      this.moddle = this.storeModuler.get("moddle"); //创建标签
      this.defaultElement = this.$store.state.readUsertaskElementextensionElements.userDetail;
      this.extensions = this.defaultElement;
      this.setDefaultProperties();
      this.initIsFixed();
      this.initpositionValue();
    },
    setDefaultProperties() {
      //机构范围
      this.orgScope = this.$store.state.readUsertaskElementextensionElements.orgScope;
      let assigneeuserOrgScope = this.moddle.create("flowable:orgScope", {
        value: this.orgScope,
      });
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:orgScope") {
          this.repetition = true;
          return;
        }
      });
      if (!this.repetition) {
        this.extensions.values.push(assigneeuserOrgScope);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;

      // 指定机构：单位或部门
      // this.orgvalue = this.$store.state.readUsertaskElementextensionElements.orgvalue;
      // let assigneeuserOrgvalue = this.moddle.create("flowable:orgvalue", {
      //   value: this.orgvalue,
      // });
      // this.extensions.values.push(assigneeuserOrgvalue);
      // this.modeling.updateProperties(this.element, {
      //   extensionElements: this.extensions,
      // });
      this.orgvalue = this.$store.state.readUsertaskElementextensionElements.orgvalue;
      let assigneeuserOrgvalue = this.moddle.create("flowable:orgvalue", {
        value: this.orgvalue,
      });

      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:orgvalue") {
          this.repetition = true;
          return;
        }
      });
      if (!this.repetition) {
        this.extensions.values.push(assigneeuserOrgvalue);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;
    },
    initpositionValue() {
      //初始化角色
      this.roleValue = this.$store.state.readUsertaskElementextensionElements.roleValue;
      let assigneeuserOrgScope = this.moddle.create("flowable:roleValue", {
        value: this.roleValue,
      });
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:roleValue") {
          this.repetition = true;
          return;
        }
      });
      if (!this.repetition) {
        this.extensions.values.push(assigneeuserOrgScope);
        this.modeling.updateProperties(this.element, {
          extensionElements: this.extensions,
        });
      }
      this.repetition = false;

      // this.extensions.values.push(assigneeuserOrgScope);
      // this.modeling.updateProperties(this.element, {
      //   extensionElements: this.extensions,
      // });

      if (this.roleValue) {
        this.checkList = this.roleValue.split(",");
        this.showRoles = true;
      }
    },
    initIsFixed() {
      //初始化是否固定
      let autoSelect = this.$store.state.readUsertaskElementextensionElements
        .autoSelect; //true和false
      console.log(autoSelect);
      switch (autoSelect) {
        case "true":
          this.autoSelect = "1";
          this.autoSelectValue = "true";
          break;
        case "false":
          this.autoSelect = "0";
          this.autoSelectValue = "false";
          break;
      }
      let assigneeOptionIsFixed = this.moddle.create("flowable:autoSelect", {
        value: this.IsFixedValue,
      });
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:autoSelect") {
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

      // this.extensions.values.push(assigneeOptionIsFixed);
      // this.modeling.updateProperties(this.element, {
      //   extensionElements: this.extensions,
      // });
    },

    controlSelectUnitOrDepantmentDialog() {
      this.centerDialogVisible = true;
    },
    showCheckList() {
      this.showPositionsList = false;
      this.checkList.filter((item) => {
        return item != "";
      });
      console.log(this.checkList);
      this.positionValue = this.checkList.join(",");
      console.log(this.positionValue);
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:roleValue") {
          item.value = this.positionValue;
          return;
        }
      });
      // this.extensions.values[3].value = this.positionValue;
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
      this.showRoles = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
  watch: {
    //机构范围
    orgScope(val) {
      this.$store.state.readUsertaskElementextensionElements.orgScope = val;
      if (val == "START_DEPARTMENT" || val == "START_COMPANY") {
        this.IsDisabled = true;
      }
      if (val == "GIVEN_ORG") {
        this.IsDisabled = false;
      }

      // this.extensions.values[1].value = val;
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:orgScope") {
          item.value = val;
          return;
        }
      });
      console.log(this.extensions);
      console.log(this.element);
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
    autoSelect(val) {
      let value = "";
      val == "1" ? (value = "true") : (value = "false");
      this.$store.state.readUsertaskElementextensionElements.autoSelect = value;
      // this.extensions.values[2].value = value;
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:autoSelect") {
          item.value = val;
          return;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
    // checkList: {
    //   deep: true,
    //   handler(value) {
    //     if (this.checkList) {
    //       console.log(this.checkList);
    //       this.checkList.filter((item) => {
    //         return item != "";
    //       });

    //       // this.checkList = this.checkList.shift()
    //       this.positionValue = this.checkList.join(",");
    //       console.log(this.positionValue);
    //       this.extensions.values[3].value = this.positionValue;
    //     }
    //     this.modeling.updateProperties(this.element, {
    //       extensionElements: this.extensions,
    //     });
    //   },
    // },
  },
};
</script>

<style scoped>
.spifyClassIsORG {
  padding: 0 10px 10px 10px;
}
.orgScope {
  margin: 0 10px 8px 14px;
}

.orgScope .title {
  font-size: 13px;
  font-weight: bold;
  display: block;
  margin: 4px 0;
  text-align: left;
}
.orgScope label {
  display: block;
  float: left;
  margin: 4px;
}
.selectUnitOrDepantment,
.selectPositions {
  height: 44px;
}
.selectUnitOrDepantment button {
  display: block;
  margin: 4px 10px 8px 14px;
}
.selectPositions button {
  display: block;
  margin: 4px 10px 8px 14px;
}
.el-button {
  float: left;
  margin: 4px;
  text-align: left;
  font-weight: bold;
}

[class*="el-icon-caret"] {
  display: block !important;
}

.tree {
  width: 50%;
}
.autoSelect {
  font-weight: bold;
  text-align: left;
  margin: 0 10px 8px 14px;
}
.showRolesList {
  text-align: left;
}
/* el-tree-node__expand-icon el-icon-caret-right */
</style>
