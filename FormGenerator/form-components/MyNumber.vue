<!--
  @author: Lucifer
  @description: 自定义数字输入框

  @param: min(Number): 最小值
  @param: max(Number): 最大值
  @param: step(Number): 步长
  @param: precision(Number): 精确度
  @param: size(String): 尺寸
  @param: readonly(Boolean): 是否只读
  @param: controls(Boolean): 是否显示控制按钮

  @event: change: 值改变
  @event: focus: 聚焦
  @event: blur: 失去焦点
-->
<template>
  <div class="my-number">
    <!-- 有最大值和最小值 -->
    <el-input-number
      v-model="numberRealValue"
      v-if="hasMax && hasMin"

      :min="min"
      :max="max"
      :step="step"
      :precision="precision"
      :size="size"
      :disabled="readonly"
      :controls="controls"

      @focus="focus"
      @blur="blur"
    ></el-input-number>

    <!-- 有最大值，没有最小值 -->
    <el-input-number
      v-model="numberRealValue"
      v-if="hasMax && (!hasMin)"

      :min="min"
      :max="max"
      :step="step"
      :precision="precision"
      :size="size"
      :disabled="readonly"
      :controls="controls"

      @focus="focus"
      @blur="blur"
    ></el-input-number>

    <!-- 没有最大值，有最小值 -->
    <el-input-number
      v-model="numberRealValue"
      v-if="(!hasMax) && hasMin"

      :min="min"
      :max="max"
      :step="step"
      :precision="precision"
      :size="size"
      :disabled="readonly"
      :controls="controls"

      @focus="focus"
      @blur="blur"
    ></el-input-number>

    <!-- 没有最大值和最小值 -->
    <el-input-number
      v-model="numberRealValue"
      v-if="(!hasMax) && (!hasMin)"

      :step="step"
      :precision="precision"
      :size="size"
      :disabled="readonly"
      :controls="controls"

      @focus="focus"
      @blur="blur"
    ></el-input-number>
  </div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
  name: 'MyNumber',
  mixins: [ LogMixin ],
  model: {
    prop: 'numberval',
    event: 'updateNumber'
  },
  props: {
    numberval: {
      type: Number,
      default() {
        return 0
      }
    },
    componentid: {
      type: String,
      default: 'switch'
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'large'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      numberRealValue: this.numberval
    }
  },
  computed: {
    hasMax() {
      return !(this.max == undefined)
    },
    hasMin() {
      return !(this.min == undefined)
    }
  },
  watch: {
    numberval(curVal, oldVal) {
      this.debugLog('Number组件[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.numberRealValue = curVal
    },
    numberRealValue(curVal, oldVal) {
      this.debugLog('Number组件[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateNumber', curVal)
      this.$emit('customEvent', this.componentid, 'change', curVal)
    }
  },
  methods: {
    focus(e) {
      this.$emit('customEvent', this.componentid, 'focus', e)
    },
    blur(e) {
      this.$emit('customEvent', this.componentid, 'blur', e)
    }
  }
}
</script>

<style scoped>

</style>