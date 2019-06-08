<!--
  @author: Lucifer
  @description: 时间选择器组件

  @param: readonly(Boolean): 是否只读
  @param: isRange(Boolean): 是否为时间范围选择
  @param: editable(Boolean): 文本框是否允许编辑
  @param: clearable(Boolean): 是否显示清除按钮
  @param: size(String): 尺寸
  @param: placeholder(String): 占位文本
  @param: startPlaceholder(String): 范围选择时开始时间的占位内容
  @param: endPlaceholder(String): 范围选择时结束时间的占位内容
  @param: pickerOptions(Object): 时间选择器的特殊选项
  @param: valueFormat(String): 时间格式化规则
  @param: rangeSeparator(String): 范围选择时的分隔符

	@event: change: 值改变事件
	@event: blur: 失去焦点
	@event: focus: 获得焦点
-->
<template>
  <div>
    <el-time-picker
      v-model="timepickerRealValue"
      ref="timepicker"

      :readonly="readonly"
      :is-range="isRange"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :value-format="valueFormat"

      @blur="handleBlurEvent"
      @focus="handleFocusEvent"
    ></el-time-picker>
  </div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
  name: "MyTimepicker",
  mixins: [ LogMixin ],
  model: {
    prop: 'timepickervalue',
    event: 'updateTimepicker'
  },
  props: {
    timepickervalue: {
      type: [String, Array],
      default() {
        return this.isRange ? ['', ''] : ''
      }
    },
    componentid: {
      type: String,
      default() {
        return 'timepicker' + new Date().toString()
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'medium'
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    startPlaceholder: {
      type: String,
      default: '请选择开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '请选择结束时间'
    },
    isRange: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String,
      default: '-'
    },
    pickerOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    valueFormat: {
      type: String,
      default: 'HH:mm:ss'
    }
  },
  data() {
    return {
      timepickerRealValue: this.timepickervalue,
      status: {
        focus: false
      }
    }
  },
  methods: {
    handleBlurEvent(comp) {
      if (this.status.focus) {
        this.status.focus = false
        this.$emit('customEvent', this.componentid, 'blur', comp)
      }
    },
    handleFocusEvent(comp) {
      if (!this.status.focus) {
        this.status.focus = true
        this.$emit('customEvent', this.componentid, 'focus', comp)
      }
    }
  },
  watch: {
    timepickervalue(curVal, oldVal) {
      this.debugLog('Timepicker[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.timepickerRealValue = curVal
    },
    timepickerRealValue(curVal, oldVal) {
      this.debugLog('Timepicker[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateTimepicker', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
    }
  }
}
</script>

<style scoped>

</style>