<!--
  @author: Lucifer
  @description: 下拉框组件

  @param: multiple(Boolean): 是否多选
  @param: size(String): 尺寸
  @param: clearable(Boolean): 是否显示清除按钮
  @param: multiple-limit(Number): 最大选择数量(多选时可用)，为0时不限制
  @param: placeholder(String): 占位文本
  @param: dictList(Array): 选项列表
	@param: textField(String): 选项列表文本域
	@param: valueField(String): 选项列表值域
	@param: readonly(Boolean): 是否只读

	@event: change: 值改变事件
	@evnet: visible-change: 下拉框出现/隐藏事件
	@event: remove-tag: 移除选中tag(多选时可用)
	@event: clear: 清空选中选项
	@event: blur: 失去焦点
	@event: focus: 获得焦点
-->
<template>
  <div>
    <el-select
      v-model="selectRealValue"

      :multiple="multiple"
      :size="size"
      :clearable="clearable"
      :placeholder="placeholder"
      :multiple-limit="multipleLimit"
      :disabled="readonly"

      @clear="handleClear"
      @visible-change="handleVisibleChange"
      @remove-tag="handleRemoveTag"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <el-option
        v-for="item in dictList"
        :key="item[valueField]"
        :label="item[textField]"
        :value="item[valueField]"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
  name: 'MySelect',
  mixins: [ LogMixin ],
  model: {
    prop: 'selectval',
    event: 'updateSelect'
  },
  props: {
    selectval: {
      type: [String, Array],
      default() {
        // 根据是否多选，来判断默认值
        if (this.multiple === undefined || !this.multiple) {
          // multiple未定义(默认false) 或者是 multiple为false -> 单选模式
          return ''
        } else {
          // 复选模式
          return []
        }
      }
    },
    componentid: {
      type: String,
      default() {
        return 'select' + new Date().toString()
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    dictList: {
			type: Array,
			default() {
				return []
			}
		},
		textField: {
			type: String,
			default: 'text'
		},
		valueField: {
			type: String,
			default: 'value'
		},
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectRealValue: this.selectval,
      focusFlag: false
    }
  },
  methods: {
    handleClear() {
      this.$emit('customEvent', this.componentid, 'clear')
    },
    handleVisibleChange(visibleFlag) {
      this.$emit('customEvent', this.componentid, 'visible-change', visibleFlag)
    },
    handleRemoveTag(removeVal) {
      this.$emit('customEvent', this.componentid, 'remove-tag', removeVal)
    },
    handleFocus(e) {
      this.$emit('customEvent', this.componentid, 'focus', e)
    },
    handleBlur(e) {
      this.$emit('customEvent', this.componentid, 'blur', e)
    }
  },
  watch: {
    selectval(curVal, oldVal) {
      this.debugLog('Select组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.selectRealValue = curVal
    },
    selectRealValue(curVal, oldVal) {
      this.debugLog('Select组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateSelect', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
    }
  }
}
</script>

<style scoped>

</style>