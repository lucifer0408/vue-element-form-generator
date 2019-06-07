<!--
  @author: Lucifer
  @description: 按钮组件

  @param: btnType(String): 按钮类型
  @param: plain(Boolean): 是否朴素按钮
  @param: round(Boolean): 是否圆角
  @param: disabled(Boolean): 是否禁用
  @param: size(String): 尺寸，默认medium
  @param: icon(String): 按钮图标

  @event: click: 点击事件
 -->

<template>
  <div class="my-button">
    <el-button
      :type="btnType"
      :plain="plain"
      :round="round"
      :disabled="disabled"
      :size="size"
      :icon="icon"
      @click="btnClick"
    >{{ btnText }}</el-button>
  </div>
</template>

<script>
import LogMixin from '../mixins/component-log-mixin'

export default {
  name: 'MyButton',
  mixins: [LogMixin],
  props: {
    btnType: {
      type: String,
      default: 'primary'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    componentid: {
      type: [String, Number],
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    /**
     * @description: 按钮的点击事件
     * */
    btnClick() {
      this.$emit('customEvent', this.componentid, 'click')
    }
  }
}
</script>

<style scoped>
</style>
