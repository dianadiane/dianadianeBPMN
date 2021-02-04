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
      <!-- <el-collapse-item name="2" title="">
          <template slot="title" name="1">
          反馈 Feedback
        </template>
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item> -->
      <!-- <el-collapse-item title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item> -->
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