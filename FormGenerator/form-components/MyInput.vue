<!--
  @author: Lucifer
  @description: 输入框组件

  @param: inputtype(String): 输入框的类型，包括: text(默认), textarea以及H5原生的输入框类型
  @param: placeholder(String): 占位文字，当输入框的值为空时显示的文字
  @param: clearable(Boolean): 是否显示清空按钮
  @param: showPassword(Boolean): 是否显示切换密码显示的按钮(仅当inputtype为password时可用)
  @param: readonly(Boolean): 是否只读
  @param: size(String): 尺寸，默认medium
  @param: rows(Number): 文本行数(仅当inputtype为textarea时可用)
  @param: componentid(String/Number): 组件ID

  @event: clear: 清空(触发clear的时也会触发change事件)
  @event: change: 值改变
 -->
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

      @blur="handleBlur"
      @focus="handleFocus"
      @clear="handleClear"
    ></el-input>
  </div>
</template>

<script>
import LogMixin from '../mixins/log-mixin'

export default {
  name: 'MyInput',
  mixins: [ LogMixin ],
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
      inputRealValue: this.inputvalue,
      config: {
        focus: false,
        valueChanged: false
      }
    }
  },
  methods: {
    /**
     * @author: Lucifer
     * @description: 输入框的清空事件(仅当clearable为true时才会触发)
     * */
    handleClear() {
      this.$emit('customEvent', this.componentid, 'clear')
    },
    /**
     * @author: Lucifer
     * @description: 输入框的值改变事件，触发自定义的updateInput事件，使v-model绑定的值更新；同时通过evnetBus触发change事件
     * */
    handleChange(val) {
      this.$emit('updateInput', val)
      this.$emit('customEvent', this.componentid, 'change', val)
    },
    /**
     * @author: Lucifer
     * @description: 聚焦的处理
     */
    handleFocus() {
      this.config.focus = true
      this.config.valueChanged = false
    },
    /**
     * @author: Lucifer
     * @description: 失去焦点的处理
     */
    handleBlur() {
      this.config.focus = false
      
      if (this.config.valueChanged) {
        this.$emit('updateInput', this.inputRealValue)
        this.$emit('customEvent', this.componentid, 'change', this.inputRealValue)
      }
    }
  },
  watch: {
    /**
     * @description: 监听传入的inputvalue的变化，当发生变化时更新组件内部的inputRealValue
     * */
    inputvalue(curVal, oldVal) {
      this.debugLog('Input组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.inputRealValue = curVal
    },
    /**
     * @description: 监听内部的inputRealValue的变化，如果当前是聚焦状态，不进行处理；如果当前不是聚焦状态，则触发change事件
     */
    inputRealValue(curVal, oldVal) {
      this.debugLog('Input组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.config.valueChanged = true

      if (!this.config.focus) {
        this.debugLog('Input组件[', this.componentid, ']当前没有聚焦，触发change事件')
        this.$emit('updateInput', curVal)
        this.$emit('customEvent', this.componentid, 'change', curVal)
        this.config.valueChanged = false
      }
    }
  }
}
</script>

<style scoped>
/deep/.el-input {
  width: auto;
}
</style>