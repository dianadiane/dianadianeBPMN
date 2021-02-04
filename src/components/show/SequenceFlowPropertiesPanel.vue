<template>
  <div>
    <!-- <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"> <i class="el-icon-date"></i>基本属性</span> -->
    
    <!-- <el-collapse
      v-model="activeNames"
      @change="handleChange"
      class="conventionalPanel"
    >
      <el-collapse-item title="常规属性" class="conventionalPanel">
       
      </el-collapse-item>
    </el-collapse> -->

    <el-collapse :value="['1','2']">
      <el-collapse-item name="1">
        <template slot="title" name="1">
          <span class="GeneralProperties StartNodePanel">常规属性</span>
        </template>
        <div>
           <conventionTab></conventionTab>
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
import conventionTab from "../tabs/convention";
// import extendsTab from "../tabs/extends";
// import watcherTab from "../tabs/watcher";

export default {
  props: {},
  data: () => {
    return {
      element: null,
      activeNames: ["1"], //手风琴
    };
  },
  created() {
    this.elementValueToSelf();
  },
  components: {
    conventionTab,
    // extendsTab,
    // watcherTab,
  },
  methods: {
    elementValueToSelf() {
      //元素属性传进来
      this.element = this.$store.state.selectElement;
      console.log(this.element);
    },
    changeField(event, type) {
      console.log(event);
      console.log(type);
      const value = event.target.value;
      this.element[type] = value;
      let properties = {};
      properties[type] = value;
      this.updateProperties(properties);
    },
    handleChange(val) {
      console.log(val);
    },
    updateProperties(properties) {
      const { modeler, element } = this;
      console.log(this);
      const modeling = modeler.get("modeling");
      modeling.updateProperties(element, properties);
    },
  },
};
</script>

<style scoped>
</style>>