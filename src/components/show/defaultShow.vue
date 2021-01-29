<template>
  <div class="default-properties-panel">
    "这里是非选中状态默认展示页面"
    <!-- <div>
      <fieldset class="element-item">
        <label>id</label>
        <span>{{ element.id }}</span>
      </fieldset>
      <fieldset class="element-item">
        <label>name</label>
        <input :value="element.name" @change="event => changeField(event, 'name')" />
      </fieldset>
      <fieldset class="element-item">
        <label>customProps</label>
        <input :value="element.customProps" @change="event => changeField(event, 'customProps')" />
      </fieldset>
      <fieldset class="element-item">
        <label>节点颜色</label>
        <input type="color" :value="element.color" @change="event => changeField(event, 'color')" />
      </fieldset>
      <fieldset class="element-item" v-if="isEvent">
        <label>修改event节点类型</label>
        <select @change="changeEventType" :value="eventType">
          <option v-for="option in eventTypes" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </fieldset>
      <fieldset class="element-item" v-if="isTask">
        <label>修改Task节点类型</label>
        <select @change="changeTaskType" :value="taskType">
          <option v-for="option in taskTypes" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </fieldset>
    </div> -->
  </div>
</template>

<script>
export default {
  props:{
    // 本来想把开始元素传进来，未实现
    StartElement:{
      type:Object,
    }
  },
  created(){
    this.printDefaultElement()
  },
  methods:{
    printDefaultElement(){
      // console.log(this.StartElement)
    }
  }
}
</script>