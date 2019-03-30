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
    event: 'input'
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
  methods: {

  },
  watch: {
    selectval(curVal) {
      this.switchVal = curVal
    },
    switchVal(curVal) {
      this.$emit('input', curVal)
      this.$emit('change', this.componentid, 'change', curVal)
    }
  }
}
</script>

<style scoped>
</style>