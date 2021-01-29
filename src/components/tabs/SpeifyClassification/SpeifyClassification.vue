<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      title="分配方式"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <!-- <span>这是一段信息</span> -->
      <el-radio v-model="radio" label="0">人员</el-radio>
      <el-radio v-model="radio" label="1">机构</el-radio>
      <el-radio v-model="radio" label="2">角色</el-radio>
      <el-radio v-model="radio" label="3">职位</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogMyFn('cancel')">取 消</el-button>
        <el-button type="primary" @click="closeDialogMyFn('confirm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ["SpeifyClassificationDialog", "closeDialog"],
  data() {
    return {
      bpmnFactory: null,
      dialogVisible: false, //弹框
      radio: "0", //设置选项
      choseAssigneeOption: ["USER", "ORG", "ROLE", "POSITION"],
      element: null,
      ChoseDetails:false//细节组件
    };
  },
  components: {
  },
  created() {
    this.IsOpenDialog();
  },
  methods: {
    IsOpenDialog() {
      this.dialogVisible = this.SpeifyClassificationDialog;
      this.element = this.$store.state.selectElement;
    },
    closeDialogMyFn(message) {
      let assigneeOptionChose = this.choseAssigneeOption[this.radio];
      //把assignee选择传回去
      if (message == "cancel") {
        this.$emit("closeDialog");
        return;
      }
      if (message == "confirm") {
          this.ChoseDetails = true;
          console.log(this.ChoseDetails)
        this.$emit("closeDialog", assigneeOptionChose);
        console.log(this.radio);
        this.element = this.$store.state.selectElement;

        this.storeModuler = this.$store.state.moduler;
        console.log(this.storeModuler)
        this.bpmnFactory = this.storeModuler.get("bpmnFactory");
        const moddle = this.storeModuler.get("moddle");
        const extensions = moddle.create("bpmn:ExtensionElements", {
          values: [],
        });
        //  const props = moddle.create("camunda:Properties", { values: [] });
        // let content = `<![CDATA[${assigneeOptionChose}]]>`//不识别
        const assigneeOption = moddle.create("flowable:assigneeOption", {
          value: assigneeOptionChose,
        });
        extensions.values.push(assigneeOption);
        console.log(assigneeOption);
        this.storeModuler.get("modeling").updateProperties(this.element, {
          extensionElements: extensions,
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>