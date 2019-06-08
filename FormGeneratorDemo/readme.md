# vue-element-form-generator

## 1. 工程描述

> vue-element-form-generator的示例工程

## 2. vue-element-form-generator用途

* 使用JSON配置的方式生成表单，提高页面开发的效率
* 使用el-row和el-col进行布局，方式统一，并且可以自适应

## 3. 支持组件
* ElementUI的组件: 
    * Switch（开关）
    * Input（文本框）
    * Button（按钮）
    * Number（数字）
    * Radio（单选框）
    * Checkbox（复选框）
    * Select（下拉框）
    * Datepicker（日期选择）
    * Timepicker（时间选择）
* 添加的自定义组件
    * Fill（填充占位）
## 4. Log开关
* 每个组件中都添加了debug属性，默认为false，当设置为true时可以输出组件执行过程的日志
* Form本身也添加了debug属性，默认为false，当设置为true时可以输出Form初始化、更新时的日志