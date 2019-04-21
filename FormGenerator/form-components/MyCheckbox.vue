<!--
  @author: Lucifer
  @description: Checkbox复选框组件

	@param: button(Boolean): 是否是CheckboxButton
	@param: size(String): 尺寸
	@param: readonly(Boolean): 是否只读
	@param: textColor(String): 按钮形式的 Checkbox 激活时的文本颜色
	@param: fillColor(String): 按钮形式的 Checkbox 激活时的填充色和边框色
	@param: dictList(Array): 选项列表
	@param: textField(String): 选项列表文本域
	@param: valueField(String): 选项列表值域
	@param: min(Number): 最少选择数量(默认0)
	@param: max(Number): 最大选择数量(默认可选所有)

	@event: change: 值改变事件
-->
<template>
  <div class="my-checkbox">
		<el-checkbox-group 
			v-model="checkboxRealValue"

			:disabled="readonly"
			:size="size"
			:text-color="textColor"
			:fill="fillColor"
			:min="min"
			:max="currentMax"
		>
			<div v-if="!button">
				<el-checkbox v-for="item in dictList" :key="item[valueField]" :label="item[valueField]">{{item[textField]}}</el-checkbox>
			</div>
			<div v-else>
				<el-checkbox-button v-for="item in dictList" :key="item[valueField]" :label="item[valueField]">{{item[textField]}}</el-checkbox-button>
			</div>
		</el-checkbox-group>
	</div>
</template>

<script>
import LogMixin from '../mixins/log-mixin'

export default {
	name: 'MyCheckbox',
	mixins: [ LogMixin ],
	model: {
		prop: 'checkboxval',
		event: 'updateCheckbox'
	},
	props: {
		checkboxval: {
			type: Array,
			default() {
				return []
			}
		},
		button: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'medium'
		},
		readonly: {
			type: Boolean,
			default: false
		},
		textColor: {
			type: String,
			default: '#FFFFFF'
		},
		fillColor: {
			type: String,
			default: '#409EFF'
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
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: undefined
		},
		componentid: {
      type: String,
      default() {
				return 'checkbox' + new Date().toString()
			}
    }
	},
	data() {
		return {
			checkboxRealValue: this.checkboxval
		}
	},
	watch: {
		checkboxval(curVal, oldVal) {
			this.debugLog('Checkbox组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.checkboxRealValue = curVal
		},
		checkboxRealValue(curVal, oldVal) {
			this.debugLog('Checkbox组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateCheckbox', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
		}
	},
	computed: {
		currentMax() {
			return this.max ? this.max : this.dictList.length
		}
	}
}
</script>

<style scoped>

</style>