<template>
  <div class="my-input">
    <el-input
      v-model="inputRealValue"

      :type="inputtype"
      :placeholder="placeholder"
      :clearable="clearable"
      :show-password="showPassword"
      :readonly="readonly"
      :size="size"
      :rows="rows"

      @clear="handleClear"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  model: {
    prop: 'inputvalue',
    event: 'updateInput'
  },
  props: {
    inputvalue: {
      type: String,
      default: ''
    },
    componentid: {
      type: String,
      default: ''
    },
    inputtype: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      inputRealValue: this.inputvalue
    }
  },
  methods: {
    handleClear() {
      this.$emit('clear', this.componentid, 'clear')
    }
  },
  watch: {
    inputvalue(curVal) {
      this.inputRealValue = curVal
    },
    inputRealValue(curVal) {
      this.$emit('updateInput', curVal)
      this.$emit('change', this.componentid, 'change', curVal)
    }
  }
}
</script>

<style scoped>
.el-input {
  width: auto;
}
</style>