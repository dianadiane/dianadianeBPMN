<template>
  <div class="spifyClassIsORG clearfix">
    <hr />
    <div class="orgScope clearfix">
      <span class="title">机构范围：</span>
      <el-radio class="orgScopeRadio" v-model="orgScope" label="1"
        >发起人所在部门</el-radio
      >
      <el-radio class="orgScopeRadio" v-model="orgScope" label="2"
        >发起人所在公司</el-radio
      >
      <el-radio class="orgScopeRadio" v-model="orgScope" label="3"
        >指定机构</el-radio
      >
    </div>
    <div class="selectUnitOrDepantment">
       <el-button size="small" :disabled="IsDisabled">请选择单位或部门</el-button>
    </div>
    <div class="selectPositions">
       <el-button size="small">请选择岗位</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orgScope: "",
      orgValue: "",
      IsDisabled:false,
    };
  },
  watch: {
    //控制机构范围
    orgScope(val) {
      if (val == "1" || val == "2") {
        this.IsDisabled =true;
      }
       if (val == "3") {
        this.IsDisabled =false;
      }
    },
  },
};
</script>

<style>
.spifyClassIsORG{
  padding: 0 10px 10px 10px;
}
.orgScope {
  margin: 0 10px 8px 14px;
}
.orgValue {
  margin: 0 10px 8px 14px;
}

.orgScope .title,
.orgValue .title {
  font-size: 13px;
  font-weight: bold;
  display: block;
  margin: 4px 0;
  text-align: left;
}
.orgScopeRadio,
.orgValueRadio {
  display: block;
  text-align: left;
  float: left;
  margin: 4px;
}
.selectUnitOrDepantment{
  text-align: left;
  margin: 0 10px 8px 14px;
}
.selectPositions{
  text-align: left;
  margin: 0 10px 8px 14px;
}
</style>