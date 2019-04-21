<template>
  <div>
      <form-generator :formConfig="formConfig" v-model="formData"></form-generator>
      <br />
      <p>表单数据: </p>
      <p>{{JSON.stringify(formData, 2)}}</p>

      <br />
  </div>
</template>

<script>
// import FormGenerator from 'vue-element-form-generator'
import FormGenerator from '../../FormGenerator'

export default {
  components: { FormGenerator },
  data() {
    return {
      formConfig: {
        debug: false,
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
            },
            debug: true
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
            type: 'radio',
            id: 'radio1',
            name: 'radio1',
            width: 12,
            label: '单选框1',
            dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
            default: '2'
          },
          {
            type: 'radio',
            id: 'radio2',
            name: 'radio2',
            width: 12,
            label: '单选框2',
            button: true,
            dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
            events: {
              change(formCtx, val) {
                console.log('当前值', val)
                formCtx.formData.radio1 = val
              }
            }
          },
          {
            type: 'checkbox',
            id: 'checkbox1',
            name: 'checkbox1',
            width: 12,
            label: '复选框1',
            dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
            default: ['1']
          },
          {
            type: 'checkbox',
            id: 'checkbox2',
            name: 'checkbox2',
            width: 12,
            label: '复选框2',
            button: true,
            dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
            max: 2,
            events: {
              change(formCtx, val) {
                console.log('当前值', val)
                formCtx.formData.checkbox1 = val
              }
            }
          },
          {
            type: 'number',
            id: 'number1',
            name: 'number1',
            width: 6,
            label: '数字1'
          },
          {
            type: 'number',
            id: 'number2',
            name: 'number2',
            width: 6,
            label: '数字2',
            min: 0,
            max: 1,
            precision: 2,
            step: 0.1
          },
          {
            type: 'number',
            id: 'number3',
            name: 'number3',
            width: 6,
            label: '数字3'
          },
          {
            type: 'number',
            id: 'number4',
            name: 'number4',
            width: 6,
            label: '数字4'
          },
          {
            type: 'select',
            id: 'select1',
            name: 'select1',
            width: 6,
            label: '单选框1',
            dictList: [
              {'text': 11, 'value': '1'}, 
              {'text': 22, 'value': '2'}, 
              {'text': 33, 'value': '3'},
              {'text': 44, 'value': '4'},
              {'text': 55, 'value': '5'},
            ],
            clearable: true,
            events: {
              change(formCtx, val) {
                console.log('change')
                console.log(val)
              },
              focus() {
                console.log('focus')
              },
              blur() {
                console.log('blur')
              },
              'visible-change'(formCtx, flag) {
                console.log('visible change', flag)
              },
              clear() {
                console.log('clear')
              }
            }
          },
          {
            type: 'select',
            id: 'multiselect1',
            name: 'multiselect1',
            width: 6,
            label: '复选框1',
            multiple: true,
            dictList: [
              {'text': 11, 'value': '1'}, 
              {'text': 22, 'value': '2'}, 
              {'text': 33, 'value': '3'},
              {'text': 44, 'value': '4'},
              {'text': 55, 'value': '5'},
            ],
            clearable: true,
            limit: 3,
            events: {
              'remove-tag'(formCtx, removeVal) {
                console.log('remove tag', removeVal)
              }
            }
          },
          {
            type: 'select',
            id: 'select3',
            name: 'select3',
            width: 6,
            label: '单选框1',
            dictList: [
              {'text': 11, 'value': '1'}, 
              {'text': 22, 'value': '2'}, 
              {'text': 33, 'value': '3'},
              {'text': 44, 'value': '4'},
              {'text': 55, 'value': '5'},
            ],
            clearable: true,
            debug: true
          },
          {
            type: 'select',
            id: 'select4',
            name: 'select4',
            width: 6,
            label: '单选框1',
            dictList: [
              {'text': 11, 'value': '1'}, 
              {'text': 22, 'value': '2'}, 
              {'text': 33, 'value': '3'},
              {'text': 44, 'value': '4'},
              {'text': 55, 'value': '5'},
            ],
            clearable: true,
            debug: true
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
  },
  methods: {
    
  }
}
</script>

<style scoped>
p {
  text-align: left;
}
</style>