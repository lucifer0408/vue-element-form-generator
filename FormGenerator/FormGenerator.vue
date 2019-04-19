<template>
  <div class="form-generator">
    <el-form
      rel="generateForm"
      :model="formCtx.formData"
      :label-width="formConfigPage.labelWidth + 'px'"
      class="generate-form"
    >
      <el-row style="height: 100%;" :gutter="20">
        <el-col v-for="(item, index) in formConfigPage.items" :key="index" :span="item.width ? item.width : 0">
          <el-form-item
            v-show="item.visible"
            :label="item.type == 'MyButton' ? '' : item.label"
            :prop="item.name"
            :label-width="item.type == 'MyButton' ? '0px' : formConfigPage.labelWidth + 'px'"
          >
            <!-- 常规字段，不包含fill和button -->
            <component
              v-if="item.type != 'fill' && item.type != 'MyButton'"
              :is="item.type"
              v-model="formCtx.formData[item.name]"
              :componentid="item.id"
              
              :activeValue="item.activeValue"
              :inactiveValue="item.inactiveValue"
              :readonly="item.readonly"

              :inputtype="item.inputtype"
              :placeholder="item.placeholder"
              :clearable="item.clearable"
              :showPassword="item.showPassword"
              :size="item.size"
              :rows="item.rows"

              @customEvent="handleEvent"
            ></component>

            <!-- fill -->
            <div v-if="item.type == 'fill'" class="fill-component"></div>

            <!-- button -->
            <my-button
              v-if="item.type == 'MyButton'"
              :btnType="item.btnType"
              :btnText="item.btnText"
              :disabled="item.readonly"
              :plain="item.plain"
              :round="item.round"
              :size="item.size"
              :componentid="item.id"
              :icon="item.icon"
              @customEvent="handleEvent"
            ></my-button>

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MySwitch from './form-components/MySwitch'
import MyButton from './form-components/MyButton'
import MyInput from './form-components/MyInput'

export default {
  // eslint-disable-next-line
  components: { MySwitch, MyButton, MyInput },
  model: {
    prop: 'formData',
    event: 'updateForm'
  },
  props: {
    /**
     * @description: 表单配置
     */
    formConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @description: 表单的数据
     */
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @description: 表单依赖的外部参数
     */
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      /* 表单默认数据 */
      formDefaultData: {},
      /* 表单可操作性对象 */
      formCtx: {
        /* 表单数据 */
        formData: this.formData,
        /* 表单依赖的外部参数 */
        params: this.params,
        /* 时间集合 */
        events: {}
      },
      /* 表单配置(根据传入配置生成的可以被组件识别的配置) */
      formConfigPage: {},
      /* 是否已完成init */
      initFlag: false
    }
  },
  methods: {
    /**
     * @description: 生成表单的配置和默认数据
     */
    generateFormConfigAndDefaultData() {
      console.log('开始生成表单配置')
      let config = {}, defaultData = {}

      // 处理表单字段、事件、默认数据
      let items = [], rowwidth = 0

      if (this.formConfig.items) {
        for (let i = 0; i < this.formConfig.items.length; i++) {
          const item = JSON.parse(JSON.stringify(this.formConfig.items[i]))

          // 判断是否存在id，如果不存在需要跳过
          if (!(item.id) && item.type !== 'fill') {
            throw Error('第' + (i + 1) + '个组件没有传入ID，无法处理！')
          }

          if (!(item.name) && (item.type !== 'fill' && item.type !== 'button')) {
            throw Error('第' + (i + 1) + '个组件没有传入name，无法处理！')
          }

          //处理字段宽度
          if (item.type === "fill") {
            item.width = item.width
              ? item.width
              : (24 * (parseInt(rowwidth / 24) + 1) - rowwidth) % 24
          } else if (item.type === 'hidden') {
            item.width = 0
          } else {
            item.width = item.width ? item.width : 0
          }
          rowwidth += item.width

          //处理字段是否显示，如果没有传，默认为true
          item.visible = item.visible == undefined ? true : item.visible

          //处理字段类型
          switch(item.type) {
            /* 处理开关 */
            case 'switch': 
              item.type = 'MySwitch'

              // 处理默认数据
              if (item.default != undefined) {
                defaultData[item.name] = item.default
              } else {
                defaultData[item.name] = item.inactiveValue == undefined ? false : item.inactiveValue
              }

              break
            /* 处理按钮 */
            case 'button':
              item.type = 'MyButton'
              break
            /* 处理文本 */
            case 'text':/* text文本 */
            case 'textarea':/* textarea 长文本块 */
            case 'file': /* 文件 */
            case 'password': /* 密码 */
            case 'tel': /* 电话号码 */
            case 'email': /* 邮箱 */
            case 'hidden':/* 隐藏 */
              item.inputtype = item.type
              item.type = 'MyInput'

              //处理默认值
              defaultData[item.name] = item.default == undefined ? '' : item.default

              break
            default:
              // 默认按照文本进行处理
          }

          items.push(item)
        }
      }
      config.items = items

      this.formConfigPage = config
      this.formDefaultData = defaultData
      // console.log('处理后的表单设置: ', this.formConfigPage)
      // console.log('处理后的表单默认数据', this.formDefaultData)
    },
    /**
     * @description: 将外部传入的表单数据和表单的默认数据进行合并(以表单的外部数据为主)
     */
    generateFormDataWithDefault() {
      this.formCtx.formData = {
        ...this.formDefaultData,
        ...this.formCtx.formData
      }
      // console.log('生成的表单数据', this.formCtx.formData)
    },
    /**
     * @description: 生成表单事件
     */
    generateFormEvents() {
      let events = {}
      for (let i = 0; i < this.formConfig.items.length; i++) {
        const item = this.formConfig.items[i]
        if (item.events) {
          events[item.id] = item.events
        }
      }
      this.formConfigPage.events = events
    },
    /**
     * @description: 处理事件
     * @param: componentid: 组件ID
     * @param: eventName: 事件名称
     * @param: args: 事件回调函数的参数集合
     */
    handleEvent(componentid, eventName, ...args) {
      if (!componentid || !eventName) {
        throw Error('事件处理缺少必要的内容，无法处理！')
      }

      let formCtx = this.formCtx
      if (this.formConfigPage.events && this.formConfigPage.events[componentid] && this.formConfigPage.events[componentid][eventName]) {
        let func = this.formConfigPage.events[componentid][eventName]
        new Promise((resolve) => {
          resolve()
        }).then(() => {
          func(formCtx, ...args)
        })
      }
    },
    /**
     * @description: 初始化完成后的生命周期函数
     */
    initFinish() {
      const _this = this
      const formCtx = _this.formCtx

      if (_this.formConfig.lifecycle.initFinish) {
        const func = _this.formConfig.lifecycle.initFinish
        new Promise(resolve => {
          resolve()
        }).then(() => {
          func(formCtx)
          _this.initFlag = true
        })
      }
    },
    /**
     * @description: 更新表单配置后的生命周期函数
     */
    updateFinish() {
      console.log('updateFinish')
    },
    /**
     * @description: 生成可操作性的Form对象--formCtx
     */
    generateFormCtx() {
      const _this = this
      /* 重置表单 */
      _this.formCtx.resetForm = () => {
        _this.formConfigPage = {}
        _this.generateFormConfigAndDefaultData()
        _this.formCtx.formData = _this.formDefaultData
        /* 为什么必须设置一个倒计时才行？ */
        setTimeout(() => {
          _this.generateFormEvents()
        }, 1)
      }
      /* 设置字段属性 */
      _this.formCtx.setItemOption = (componentid, key, value) => {
        if (key === 'type' || key === 'id' || key === 'name') {
          throw Error('不支持设置该属性！')
        }

        for (let i = 0; i < _this.formConfigPage.items.length; i++) {
          if (_this.formConfigPage.items[i].id === componentid) {
            _this.formConfigPage.items[i][key] == value
          }
        }
      }
    }
  },
  watch: {
    /**
     * @description: 外部传入的formData更新后，更新formCtx.formData
     */
    formData: {
      handler(curVal) {
        this.formCtx.formData = curVal
      },
      deep: true
    },
    /**
     * @description: formCtx更新后，触发updateForm事件，更新外部传入的formData
     */
    formCtx: {
      handler(curVal) {
        this.$emit('updateForm', curVal.formData)
      },
      deep: true
    },
    /**
     * @description: params更新后，更新formCtx中的params
     */
    params: {
      handler(curVal) {
        this.formCtx.params = curVal
      },
      deep: true
    },
    /**
     * @description: formConfig更新后，需要重新生成表单，并触发updateFinish事件
     */
    formConfig: {
      handler(curVal) {
        this.generateFormCtx()
        this.generateFormConfigAndDefaultData()
        this.generateFormDataWithDefault()
        this.generateFormEvents()

        if (!this.initFlag && curVal.lifecycle.updateFinish) {
          this.updateFinish()
        }
      }
    }
  },
  created() {
    this.generateFormCtx()
    this.generateFormConfigAndDefaultData()
    this.initFinish()
    this.generateFormDataWithDefault()
    this.generateFormEvents()
  }
}
</script>

<style scoped>
.generate-form {
  padding: 10px;
}

.fill-component {
  height: 50px;
}
</style>