<template>
  <div class="form-generator">
    <el-form
      ref="generatedForm"
      :model="formdata"
      :label-width="formconfigPage.labelWidth + 'px'"
      :rules="formconfigPage.validators"
      class="generate-form"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(row, index) in formconfigPage.rows"
          :key="index"
          :span="row.width == undefined ? 0 : row.width"
        >
          <el-form-item
            v-if="row.visible"
            :prop="row.fieldname"
            :label="row.type == 'MyButton'?'':row.title"
            :label-width="row.type == 'MyButton'?'0px':formconfigPage.labelWidth + 'px'"
          >
            <!-- 正常组件 -->
            <component
              v-if="row.type != 'fill' && row.type != 'MyButton'"
              :is="row.type"
              :config="row"
              :componentid="row.formfieldid"
              :readonly="row.readonly"
              v-model="formdata[row.fieldname]"
              :disabled="row.disabled"
              :size="row.size"
              :inputtype="row.inputType"
              :placeholder="row.placeholder"
              :row-count="row.rowCount"
              :inactive-value="row.inactiveValue"
              :active-value="row.activeValue"
              :precision="row.precision"
              :minval="row.min"
              :maxval="row.max"
              :showinput="row.showinput"
              :numberstep="row.step"
              :has-min="row.hasMin"
              :has-max="row.hasMax"
              :dictdata="row.optionlist"
              :text-field="row.textField"
              :value-field="row.valueField"
              :multiselect="row.multiselect"
              :range="row.range"
              :selectable-range="row.selectableRange"
              :valueformat="row.valueformat"
              :startplaceholder="row.startplaceholder"
              :endplaceholder="row.endplaceholder"
              :rangeseparator="row.rangeseparator"
              :clearable="row.clearable"
              :first-day-of-week="row.firstDayOfWeek"
              :startdate="row.startdate"
              :enddate="row.enddate"
              @change="componentValueChange"
              @click="componentClick"
              @eventHandler="commonEvent"
            />
            <!-- 按钮的事件 -->
            <my-button
              v-if="row.type == 'MyButton'"
              :readonly="row.readonly"
              :inputtype="row.buttonType"
              :size="row.size"
              :plain="row.plain"
              :round="row.round"
              :btn-text="row.btnText"
              :icon="row.icon"
              @click="componentClick(row.formfieldid)"
            />
            <!-- type=fill时放置一个空的div填充 -->
            <div v-if="row.type == 'fill'" class="fill-component"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import FormComponents from "./form-components/form-index";

export default {
  name: "FormGeneratorBak",
  components: {
    ...FormComponents
  },
  model: {
    prop: "outformdata",
    event: "updateForm"
  },
  props: {
    formconfigFromServer: {
      type: Object,
      default: {}
    },
    outformdata: {
      type: Object,
      default: function() {
        return {};
      }
    },
    rule: {
      type: Object,
      defalut: function() {
        return {};
      }
    },
    params: {
      type: Object,
      defalut: function() {
        return {};
      }
    }
  },
  data() {
    return {
      type: "primary",
      formdata: this.outformdata, // 表单数据
      formconfigPage: {
        labelWidth: 100,
        submitUrl: "",
        rows: [],
        lifecycle: {},
        validators: {},
        events: {}
      },
      formCtx: {}, // 表单可操作对象
      initFlag: false
    };
  },
  watch: {
    outformdata(curVal, oldVal) {
      this.formdata = curVal;
    },
    formdata(curVal, oldVal) {
      this.formCtx.formdata = curVal;
      this.$emit("updateForm", curVal);
    },
    formCtx: {
      handler(curVal, oldVal) {
        this.formdata = curVal.formdata;
      },
      deep: true
    },
    formconfigFromServer: {
      handler(curVal, oldVal) {
        if (this.initFlag) {
          this.formconfigPage.lifecycle = this.formconfigFromServer.lifecycle;
          this.beforeUpdate();
          this.generateFormConfig();
          this.generateFormDefaultData();
          this.updateFinish();
        } else {
          this.formconfigPage.lifecycle = this.formconfigFromServer.lifecycle;
          this.beforeInit();
          this.generateFormConfig();
          this.generateFormDefaultData();
          this.initFinish();
        }
      },
      deep: true
    },
    params(curVal, oldVal) {
      this.formCtx.params = curVal;
    }
  },
  /**
   * @author: 孟庆云
   * @description: created生命周期，处理表单生命周期信息
   * */
  created() {
    const _this = this;
    if (_this.formconfigFromServer.lifecycle) {
      _this.formconfigPage.lifecycle = _this.formconfigFromServer.lifecycle;
    }
    if (_this.formconfigFromServer.validators) {
      _this.formconfigPage.validators = _this.formconfigFromServer.validators;
    }

    _this.formCtx.resetForm = _this.resetForm;
    _this.formCtx.submit = _this.submit;
    _this.formCtx.setComponentOptions = _this.setComponentOptions;
    _this.formCtx.setComponentEvents = _this.setComponentEvents;
    _this.formCtx.removeComponentEvent = _this.removeComponentEvent;
    _this.formCtx.formdata = _this.formdata;
    _this.formCtx.$router = _this.$router;
    _this.formCtx.$emit = (eventname, ...args) => {
      _this.$emit(eventname, args);
    };

    _this.formCtx.params = _this.params;
    _this.formCtx.validate = _this.validate;
    _this.formCtx.commonRequest = (url, data, fun) => {
      _this.$emit("requestServer", url, data, fun);
    };
    _this.formCtx.updateFormdata = formdata => {
      _this.formdata = formdata;
    };
    _this.formCtx.checkValidate = _this.checkValidate;
  },
  mounted() {
    this.beforeInit();
    this.generateFormDefaultData();
    this.generateFormConfig();
    this.initFinish();
  },
  methods: {
    /**
     * @author: 孟庆云
     * @description: 生成表单rows布局的json和表单绑定的formdata
     * */
    generateFormConfig() {
      let rows = [],
        rowwidth = 0;
      // 处理表单字段
      for (let i = 0; i < this.formconfigFromServer.rows.length; i++) {
        let tmp = this.formconfigFromServer.rows[i],
          config = JSON.parse(JSON.stringify(tmp));
        // 处理事件
        if (tmp.events) {
          this.formconfigPage.events[tmp.formfieldid] = tmp.events;
        } else {
          this.formconfigPage.events[tmp.formfieldid] = {};
        }
        delete config.events;
        // 处理宽度
        if (config.type === "fill") {
          config.width = config.width
            ? config.width
            : (24 * (parseInt(rowwidth / 24) + 1) - rowwidth) % 24;
          rowwidth += config.width;
        } else {
          config.width = config.width ? config.width : 0;
          rowwidth += config.width;
        }

        // 处理表单字段配置
        switch (tmp.type) {
          // 开关
          case "switch":
            config.type = "MySwitch";
            break;
          case "radio":
          case "radiobutton":
            config.type = "MyRadio";
            config.inputType = tmp.type;
            config.optionlist = tmp.optionlist;
            break;
          case "checkbox":
          case "checkboxbutton":
            config.type = "MyCheckbox";
            config.inputType = tmp.type;
            config.optionlist = tmp.optionlist;
            break;
          case "select":
            config.type = "MySelect";
            config.optionlist = tmp.optionlist;
            config.multiselect = false;
            break;
          case "multiselect":
            config.type = "MySelect";
            config.optionlist = tmp.optionlist;
            config.multiselect = true;
            break;
          case "timepicker":
            config.type = "MyTimepicker";
            config.range = false;
            break;
          case "timerange":
            config.type = "MyTimepicker";
            config.range = true;
            break;
          case "year":
            config.type = "MyDatepicker";
            config.inputType = tmp.type;
            config.range = false;
            config.valueformat = tmp.valueformat ? tmp.valueformat : "yyyy";
            break;
          case "month":
            config.type = "MyDatepicker";
            config.inputType = tmp.type;
            config.range = false;
            config.valueformat = tmp.valueformat ? tmp.valueformat : "yyyyMM";
            break;
          case "date":
            config.type = "MyDatepicker";
            config.inputType = tmp.type;
            config.range = false;
            config.valueformat = tmp.valueformat ? tmp.valueformat : "yyyyMMdd";
            break;
          case "daterange":
            config.type = "MyDatepicker";
            config.inputType = tmp.type;
            config.valueformat = tmp.valueformat ? tmp.valueformat : "yyyyMMdd";
            break;
          case "datetimepicker":
          case "datetimerange":
            config.type = "MyDatepicker";
            config.inputType = tmp.type;
            config.valueformat = tmp.valueformat
              ? tmp.valueformat
              : "yyyyMMdd hh:mm:ss";
            break;
          // 填充组件，填满整行
          case "fill":
            config.type = "fill";
            break;
          // button组件
          case "button":
          case "submit":
          case "reset":
            config.type = "MyButton";
            config.btnText = config.title ? config.title : "";
            break;
          // input组件
          case "text":
          case "textarea":
          case "email":
          case "hidden":
          case "password":
          case "tel":
          case "url":
            config.type = "MyInput";
            config.inputType = tmp.type;
            break;
          default:
            // 默认按照自定义组件的方式处理
            break;
        }
        if (typeof config.visible === "undefined") {
          config.visible = true;
        } else if (typeof config.visible === "boolean") {
          config.visible = config.visible;
        } else if (typeof config.visible === "string") {
          config.visible = eval("this." + config.visible);
        } else if (typeof config.visible === "number") {
          if (config.visible == 1) {
            config.visible = true;
          } else if (config.visible == 0) {
            config.visible == false;
          }
        }

        rows.push(config);
      }
      this.formconfigPage.rows = rows;
    },
    /**
     * @author: 孟庆云
     * @description: 生成表单的默认值
     * */
    generateFormDefaultData() {
      const formdata = {};
      // 处理表单字段
      for (let i = 0; i < this.formconfigFromServer.rows.length; i++) {
        const tmp = this.formconfigFromServer.rows[i];

        switch (tmp.type) {
          // 开关
          case "switch":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : false;
            break;
          case "radio":
          case "radiobutton":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : "";
            break;
          case "checkbox":
          case "checkboxbutton":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : [];
            break;
          case "select":
            formdata[tmp.fieldname] = tmp.default
              ? tmp.default
              : tmp.options && tmp.options.multiselect
              ? []
              : "";
            break;
          case "timepicker":
          case "year":
          case "month":
          case "date":
          case "datetimepicker":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : "";
            break;
          case "dateranger":
          case "timerange":
          case "datetimerange":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : ["", ""];
            break;
          case "button":
          case "submit":
          case "reset":
          case "fill":
            break;
          case "text":
          case "textarea":
          case "email":
          case "hidden":
          case "password":
          case "tel":
          case "url":
            formdata[tmp.fieldname] = tmp.default ? tmp.default : "";
            break;
          default:
            formdata[tmp.fieldname] = tmp.default ? tmp.default : "";
        }
      }

      this.formdata = formdata;
    },
    /**
     * 提交函数
     * */
    submit() {
      const formCtx = this.formCtx;
      this.beforeSubmit();
      /* 提交函数*/

      this.submitFinish();
    },
    /**
     * @author: 孟庆云
     * @description: 重置表单
     * */
    resetForm() {
      this.$refs["generatedForm"].resetFields();

      this.generateFormDefaultData();
      this.generateFormConfig();
    },

    /**
     * @author: 孟庆云
     * @description: 组件的值改变事件的触发函数
     * */
    componentValueChange(componentid, value) {
      const formCtx = this.formCtx;
      // 获取值改变事件的处理函数
      const events = this.formconfigPage.events;
      if (events[componentid]) {
        this.handleEvent(events[componentid].change).then(response => {
          eval(response);
        });
      }
    },
    commonEvent(componentid, event, ...val) {
      const formCtx = this.formCtx;
      // 获取值改变事件的处理函数
      const events = this.formconfigPage.events;
      if (events[componentid]) {
        this.handleEvent(events[componentid][event]).then(response => {
          eval(response);
        });
      }
    },
    /**
     * @author: 孟庆云
     * @description: 组件的点击事件
     * */
    componentClick(componentid) {
      const formCtx = this.formCtx;
      const _this = this;
      let row = {};
      for (let i = 0; i < this.formconfigPage.rows.length; i++) {
        const item = this.formconfigPage.rows[i];
        if (item.formfieldid == componentid) {
          row = item;
        }
      }
      if (row.buttonurl) {
        this.$router.push(row.buttonurl);
      } else {
        // 获取值改变事件的处理函数
        const events = this.formconfigPage.events;
        if (events[row.formfieldid]) {
          this.handleEvent(events[row.formfieldid].click).then(response => {
            eval(response);
          });
        }
      }
    },

    /**
     * @author: 孟庆云
     * @description: 设置组件的属性
     * */
    setComponentOptions(id, key, val) {
      let flag = false;
      for (let i = 0; i < this.formconfigPage.rows.length; i++) {
        const tmp = this.formconfigPage.rows[i];

        if (tmp.formfieldid == id) {
          flag = true;
          tmp[key] = val;
        }
      }

      if (!flag) {
        throw new Error("找不到组件");
      }
    },

    /**
     * @author: 孟庆云
     * @description: 设置组件的事件
     */
    setComponentEvents(id, eventName, eventFunc) {
      let flag = false;

      for (let i = 0; i < this.formconfigPage.rows.length; i++) {
        const tmp = this.formconfigPage.events[i];

        if (tmp.id == id) {
          flag = true;

          // 设置事件
          let componentEvent = this.formconfigPage.events[tmp.id];
          if (componentEvent == undefined) {
            componentEvent = {};
          }
          componentEvent[key] = eventFunc;
        }
      }

      if (!flag) {
        throw new Error("找不到组件");
      }
    },

    /**
     * @author: 孟庆云
     * @description: 移除组件的事件
     */
    removeComponentEvent(id, eventName) {
      let flag = false;

      for (let i = 0; i < this.formconfigPage.rows.length; i++) {
        const tmp = this.formconfigPage.events[i];

        if (tmp.id == id) {
          flag = true;

          // 设置事件
          const componentEvent = this.formconfigPage.events[tmp.id];
          if (componentEvent == undefined) {
          } else {
            delete componentEvent[key];
          }
        }
      }

      if (!flag) {
        throw new Error("找不到组件");
      }
    },

    /**
     * @author: 孟庆云
     * @description: 使用Promise，在生命周期中禁用this关键字
     */
    handleEvent(lifecycleFunc) {
      return new Promise(function(resolve, reject) {
        resolve(lifecycleFunc);
      });
    },

    /**
     * @author: 孟庆云
     * @description: 表单生命周期-表单初始化前
     * */
    beforeInit() {
      const formCtx = this.formCtx;
      if (this.formconfigPage.lifecycle.beforeInit) {
        this.handleEvent(this.formconfigPage.lifecycle.beforeInit).then(
          response => {
            eval(response);
          }
        );
      }
    },
    /**
     * @author: 孟庆云
     * @description: 表单生命周期-表单初始化完成
     * */
    initFinish() {
      const formCtx = this.formCtx;
      this.initFlag = true;
      if (this.formconfigPage.lifecycle.initFinish) {
        this.handleEvent(this.formconfigPage.lifecycle.initFinish).then(
          response => {
            eval(response);
          }
        );
      }
    },
    /**
     * @author: 渠通
     * @description: 表单生命周期-表单更新前
     */
    beforeUpdate() {
      const formCtx = this.formCtx;
      if (this.formconfigPage.lifecycle.beforeUpdate) {
        this.handleEvent(this.formconfigPage.lifecycle.beforeUpdate).then(
          response => {
            eval(response);
          }
        );
      }
    },
    /**
     * @author: 渠通
     * @description: 表单生命周期-表单更新完成
     */
    updateFinish() {
      const formCtx = this.formCtx;
      if (this.formconfigPage.lifecycle.updateFinish) {
        this.handleEvent(this.formconfigPage.lifecycle.updateFinish).then(
          response => {
            eval(response);
          }
        );
      }
    },
    /**
     * @author 渠通
     * @description 表单验证+调用接口
     */
    validate(url, data, fun) {
      const _this = this;
      this.$refs["generatedForm"].validate(valid => {
        if (valid) {
          _this.formCtx.commonRequest(url, data, fun);
        } else {
          return false;
        }
      });
    },
    /**
     * @author 渠通
     * @description 返回表单验证结果
     */
    checkValidate() {
      const _this = this;
      let flag;
      this.$refs["generatedForm"].validate(valid => {
        flag = valid;
      });
      return flag;
    }
  }
};
</script>

<style scoped>
.generate-form {
  padding: 10px;
}

.fill-component {
  height: 40px;
}
</style>
