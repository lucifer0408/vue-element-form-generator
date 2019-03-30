<template>
  <div class="my-button">
    <el-button
      :type="btnType"
      :plain="plain"
      :round="round"
      :disabled="readonly"
      :size="size"
      :icon="icon"
      @click="btnClick"
    >{{ btnText }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
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
    readonly: {
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
    btnClick() {
      this.$emit('click', this.componentid, 'click')
    }
  }
}
</script>

<style scoped>
</style>
