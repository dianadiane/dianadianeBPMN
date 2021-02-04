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
        <el-checkbox-group v-model="orgScopeValueList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
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
          <el-button type="primary" @click="confirmOrgScopeValueList()"
            >确 定</el-button
          >
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <div class="selectPositions clearfix">
      <el-button size="small" @click="showPositionsList = true"
        >请选择岗位</el-button
      >
    </div> -->
    <!-- <div class="PositionsList" v-if="showPositionsList">
      <el-dialog
        title="提示"
        :visible.sync="showPositionsList"
        width="30%"
        center
      >
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="总经理 A"></el-checkbox>
          <el-checkbox label="副经理 B"></el-checkbox>
          <el-checkbox label="职员 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>

        <span slot="footer" class="dialog-footer clearfix">
          <el-button type="primary" @click="showPositionsList = false"
            >确 定</el-button
          >
          <el-button @click="showPositionsList = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="isFixed">
      <span>是否固定：</span>
      <el-radio v-model="isFixed" label="1">是</el-radio>
      <el-radio v-model="isFixed" label="0">否</el-radio>
    </div> -->
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
      orgScopeValueList: ["选中且禁用", "复选框 A"], //指定机构
      orgScopeValue: "", //指定机构
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
      // showPositionsList: false,
      // checkList: ["选中且禁用", "复选框 A"], //选择岗位
      // isFixed: "", //是否固定
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
    },
    setDefaultProperties() {
      //机构范围

      this.orgScope = this.$store.state.readUsertaskElementextensionElements.orgScope;
      let assigneeuserOrgScope = this.moddle.create("flowable:orgScope", {
        value: this.orgScope,
      });
      //如果有这个标签，则更改内容,没有则添加
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

      // let IsHaveOrgScope = this.extensions.values.some((item) => {
      //   return item.$type == "flowable:orgScope";
      // });
      // console.log(IsHaveOrgScope);
      // if (IsHaveOrgScope) {
      //   this.extensions.values.forEach((item) => {
      //     if (item.$type == "flowable:orgScope") {
      //       item.value = this.orgScope;
      //       return;
      //     }
      //   });
      //   this.modeling.updateProperties(this.element, {
      //     extensionElements: this.extensions,
      //   });
      // } else {
      //   this.extensions.values.push(assigneeuserOrgScope);
      //   this.modeling.updateProperties(this.element, {
      //     extensionElements: this.extensions,
      //   });
      // }

      // 指定机构：单位或部门
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
    },
    //选择单位或部门
    controlSelectUnitOrDepantmentDialog() {
      this.centerDialogVisible = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    confirmOrgScopeValueList() {
      this.centerDialogVisible = false;
      this.orgScopeValue = this.orgScopeValueList.join(",");
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:orgvalue") {
          item.value = this.orgScopeValue;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
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
        //指定机构
        this.IsDisabled = false;
      }
      this.extensions.values.forEach((item) => {
        if (item.$type == "flowable:orgScope") {
          item.value = val;
        }
      });
      this.modeling.updateProperties(this.element, {
        extensionElements: this.extensions,
      });
    },
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
.selectUnitOrDepantment {
  height: 44px;
}
.selectUnitOrDepantment button {
  display: block;
  margin: 4px 10px 8px 14px;
}
/* .selectPositions button {
  display: block;
  margin: 4px 10px 8px 14px;
} */
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
.isFixed {
  font-weight: bold;
  text-align: left;
  margin: 0 10px 8px 14px;
}
/* el-tree-node__expand-icon el-icon-caret-right */
</style>