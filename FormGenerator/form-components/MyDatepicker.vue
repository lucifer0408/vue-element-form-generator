<!--
  @author: Lucifer
  @description: 日期选择器组件

  @param: readonly(Boolean): 是否只读
  @param: editable(Boolean): 文本框是否允许编辑
  @param: clearable(Boolean): 是否显示清除按钮
  @param: size(String): 尺寸
  @param: placeholder(String): 占位文本
  @param: startPlaceholder(String): 范围选择时开始时间的占位内容
  @param: endPlaceholder(String): 范围选择时结束时间的占位内容
  @param: pickerOptions(Object): 时间选择器的特殊选项
  @param: valueFormat(String): 日期格式化规则
  @param: format(String): 输入框中显示的格式化规则(默认和valueFormat相同)
  @param: rangeSeparator(String): 范围选择时的分隔符
  @param: defaultTime(Array): 范围选择时选中日期所使用的的当日具体时刻
  @param: inputtype(String): 日期选择器类型，可选有: year/month/date/dates/week/datetime/datetimerange/daterange/monthrange

	@event: change: 值改变事件
	@event: blur: 失去焦点
	@event: focus: 获得焦点
-->
<template>
  <div>
    <!-- 按照是否范围选择，分成2个组件来写，因为defaultTime只有范围选择时可用，非范围选择时传了会报错 -->

    <!-- 范围选择 -->
    <el-date-picker
      v-model="datepickerRealValue"
      v-if="isRange"
      ref="timepicker"

      :readonly="readonly"
      :editable="editable"
      :clearable="clearable"
      :type="inputtype"
      :size="size"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :value-format="valueFormat"
      :format="format"
      :default-time="defaultTime"

      @blur="handleBlurEvent"
      @focus="handleFocusEvent"
    ></el-date-picker>

    <!-- 非范围选择 -->
    <el-date-picker
      v-model="datepickerRealValue"
      v-else
      ref="timepicker"

      :readonly="readonly"
      :editable="editable"
      :clearable="clearable"
      :type="inputtype"
      :size="size"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :value-format="valueFormat"
      :format="format"

      @blur="handleBlurEvent"
      @focus="handleFocusEvent"
    ></el-date-picker>

  </div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
  name: 'MyDatepicker',
  mixins: [ LogMixin ],
  model: {
    prop: 'datepickerval',
    event: 'updateDatepicker'
  },
  props: {
    datepickerval: {
      type: [String, Array],
      default() {
        switch (this.inputtype) {
          case 'year':
          case 'month':
          case 'date':
          case 'datetime':
          case 'week':
            return ''
          case 'dates':
            return []
          case 'daterange':
          case 'datetimerange':
          case 'monthrange':
            return ['', '']
          default:
            return ''
        }
      }
    },
    componentid: {
      type: String,
      default() {
        return 'datepicker-' + this.inputtype + new Date().toString()
      }
    },
    inputtype: {
      type: String,
      default: 'date'
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
      default: '请选择日期'
    },
    startPlaceholder: {
      type: String,
      default: '请选择开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '请选择结束日期'
    },
    valueFormat: {
      type: String,
      default() {
        switch (this.inputtype) {
          case 'year':
            return 'yyyy'
          case 'month':
          case 'monthrange':
            return 'yyyy-MM'
          case 'date':
          case 'dates':
          case 'daterange':
            return 'yyyy-MM-dd'
          case 'datetime':
          case 'datetimerange':
            return 'yyyy-MM-dd HH:mm:ss'
          case 'week':
            return 'yyyy [Week] WW'
          default:
            return 'yyyy-MM-dd'
        }
      }
    },
    format: {
      type: String,
      default() {
        return this.valueFormat
      }
    },
    defaultTime: {
      type: Array,
      default() {
        switch (this.inputtype) {
          case 'year':
          case 'month':
          case 'date':
          case 'datetime':
          case 'week':
          case 'dates':
            return []
          case 'daterange':
          case 'datetimerange':
          case 'monthrange':
            const time = new Date()
            return [time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds(), time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()]
          default:
            return []
        }
        const time = new Date()
        return [
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds(),
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        ]
      }
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
  },
  data() {
    return {
      datepickerRealValue: this.datepickerval,
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
    datepickerval(curVal, oldVal) {
      this.debugLog('Datepicker[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.datepickerRealValue = curVal
    },
    datepickerRealValue(curVal, oldVal) {
      this.debugLog('Datepicker[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateDatepicker', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
    }
  },
  computed: {
    /**
     * @author: Lucifer
     * @description: 是否为范围选择
     * */
    isRange() {
      return this.inputtype.indexOf('range') !== -1
    }
  }
}
</script>

<style scoped>

</style>