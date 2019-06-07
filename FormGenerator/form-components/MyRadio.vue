<!--
  @author: Lucifer
  @description: Radio单选框组件

	@param: button(Boolean): 是否是RadioButton
	@param: size(String): 尺寸
	@param: readonly(Boolean): 是否只读
	@param: textColor(String): 按钮形式的 Radio 激活时的文本颜色
	@param: fillColor(String): 按钮形式的 Radio 激活时的填充色和边框色
	@param: dictList(Array): 选项列表
	@param: textField(String): 选项列表文本域
	@param: valueField(String): 选项列表值域

	@event: change: 值改变事件
-->
<template>
  <div class="my-radio">
		<el-radio-group 
			v-model="radioRealValue"

			:disabled="readonly"
			:size="size"
			:text-color="textColor"
			:fill="fillColor"
		>
			<div v-if="!button">
				<el-radio v-for="item in dictList" :key="item[valueField]" :label="item[valueField]">{{item[textField]}}</el-radio>
			</div>
			<div v-else>
				<el-radio-button v-for="item in dictList" :key="item[valueField]" :label="item[valueField]">{{item[textField]}}</el-radio-button>
			</div>
		</el-radio-group>
	</div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
	name: 'MyRadio',
	mixins: [ LogMixin ],
	model: {
		prop: 'radioval',
		event: 'updateRadio'
	},
	props: {
		radioval: {
			type: [String, Number],
			default() {
				return ''
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
		componentid: {
      type: String,
      default: 'switch'
    }
	},
	data() {
		return {
			radioRealValue: this.radioval
		}
	},
	watch: {
		radioval(curVal, oldVal) {
			this.debugLog('Radio组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.radioRealValue = curVal
		},
		radioRealValue(curVal, oldVal) {
			this.debugLog('Radio组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateRadio', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
		}
	}
}
</script>

<style scoped>

</style>