<template>
  <div>
      <form-generator :formConfig="formConfig" v-model="formData"></form-generator>
      {{formData}}
  </div>
</template>

<script>
import FormGenerator from 'vue-element-form-generator'

export default {
  components: { FormGenerator },
  data() {
    return {
      formConfig: {
        labelWidth: 80,
        lifecycle: {
          initFinish(formCtx) {
            console.log('initFinish')
            console.log(formCtx)
          },
          updateFinish(formCtx) {
            console.log('updateFinish', formCtx)
          }
        },
        items: [
          {
            type: 'switch',
            name: 'switch1',
            id: 'switch1',
            readonly: false,
            label: '开关1',
            visible: true,
            width: 4,
            events: {
              change(formCtx, val) {
                formCtx.formData.switch2 = val ? 1 : 0
              }
            }
          },
          {
            type: 'switch',
            name: 'switch2',
            id: 'switch2',
            readonly: false,
            label: '开关2',
            width: 4,
            activeValue: 1,
            inactiveValue: 0,
            default: 1
          },
          {
            type: 'text',
            id: 'text1',
            name: 'text1',
            width: 6,
            label: '文本1',
            events: {
              change(formCtx, val) {
                console.log('值改变了')
                formCtx.formData.hidden1 = val
              },
              clear(formCtx) {
                console.log('清空了')
                formCtx.formData.hidden1 = ''
              }
            }
          },
          {
            type: 'hidden',
            id: 'hidden1',
            name: 'hidden1',
            width: 6
          },
          {
            type: 'fill'
          },
          {
            type: 'button',
            btnText: '按钮1',
            id: 'btn1',
            width: 4,
            size: 'medium',
            events: {
              click(formCtx) {
                formCtx.formData.switch1 = !formCtx.formData.switch1
                formCtx.formData.text1 = formCtx.formData.text1 + formCtx.formData.switch2
              }
            }
          },
          {
            type: 'button',
            btnText: '重置按钮',
            id: 'btn2',
            width: 4,
            size: 'medium',
            events: {
              click(formCtx) {
                formCtx.resetForm()
              }
            }
          }
        ]
      },
      formData: {
        switch2: 0
      }
    }
  }
}
</script>

<style scoped>
</style>