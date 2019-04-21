<template>
  <div>
    <el-select
      v-model="selectRealValue"

      :multiple="multiple"
      :size="size"
      :clearable="clearable"
      :placeholder="placeholder"
      :multiple-limit="limit"

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
import LogMixin from '../mixins/log-mixin'

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
        return ''
      }
    },
    componentid: {
      type: String,
      default: 'switch'
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
    limit: {
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