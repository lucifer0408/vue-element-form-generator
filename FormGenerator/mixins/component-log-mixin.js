export default {
  name: 'LogMixin',
  props: {
    showDebugLog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    debugLog(...loginfo) {
      if (this.showDebugLog) {
        console.log(...loginfo)
      }
    }
  }
}