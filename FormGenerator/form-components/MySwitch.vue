<!--
  @author: Lucifer
  @description: 开关组件

  @param: readonly(Boolean): 是否只读
  @param: activeValue(String/Boolean/Number): 打开状态的取值
  @param: inactiveValue(String/Boolean/Number): 关闭状态的取值

  @event: change: 值改变事件
-->

<template>
  <div class="my-switch">
    <el-switch
      v-model="switchVal"
      :disabled="readonly"
      :inactive-value="inactiveValue"
      :active-value="activeValue"
    ></el-switch>
  </div>
</template>

<script>
export default {
  name: 'MySwitch',
  model: {
    prop: 'selectval',
    event: 'updateSwitch'
  },
  props: {
    selectval: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    componentid: {
      type: String,
      default: 'switch'
    }
  },
  data() {
    return {
      switchVal: this.selectval
    }
  },
  watch: {
    selectval(curVal, oldVal) {
      console.log('Switch组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.switchVal = curVal
    },
    switchVal(curVal, oldVal) {
      console.log('Switch组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateSwitch', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
    }
  }
}
</script>

<style scoped>
</style>