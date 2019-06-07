<template>
  <div>
    Timepicker
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
      type: [Date, String, Array],
      default() {
        return ''
        /* if (typeof this.timepickervalue === 'timestamp') {
          return new Date()
        } else if (typeof this.timepickervalue === 'string') {
          return ''
        } else {
          return [new Date(), new Date()]
        } */
      }
    },
    componentid: {
      type: String,
      default: 'timepicker'
    }
  },
  data() {
    return {
      timepickerRealValue: this.timepickervalue
    }
  },
  methods: {
    
  },
  watch: {
    timepickervalue(curVal, oldVal) {
      this.debugLog('Timepicker[', this.componentid, ']外部的值改变了，从', oldVal, '变成了', curVal)
      this.timepickerRealValue = curVal
    },
    timepickerRealValue(curVal, oldVal) {
      this.debugLog('Timepicker[', this.componentid, ']内部的值改变了，从', oldVal, '变成了', curVal)
      this.$emit('updateTimepicker', curVal)
    }
  },
  created() {
    
  }
}
</script>

<style scoped>

</style>