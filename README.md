# vue-element-form-generator

* 适用于ElementUI的Form Generator  
* 通过JSON对象的方式创建表单，简单易上手  
* 添加initFinish和updateFinish钩子，适用于表单初始化完成和更新完成等表单整体的默认事件  
* 创建表单的可操作对象formCtx，定义了表单可操作属性和可操作方法，在表单的钩子和控件的事件中默认可用  
* 使用ElementUI默认的24栅格布局，方便进行布局安排  
* 提供占位组件，占满整行，下一个组件直接另起一行开始  

## 1. 使用先决条件

* 引入ElementUI
  * 在入口的js文件(例如main.js)中整体引入ElementUI，暂不支持其他方式
* 引用vue-element-form-generator
  * 在需要使用的页面，使用import引入: 
```
  import FormGenerator from 'vue-element-form-generator'

  export default {
    data() {
      formConfig: {
        labelWidth: 80,
        lifecycle: {
          initFinish(formCtx) {
            // 初始化完毕
          },
          updateFinish(formCtx) {
            // 更新完毕
          }
        },
        items:[
          // 表单字段集合
        ]
      }
    }
  }
```

  * 全局引入，在main.js中引用:
```
  import FormGenerator from 'vue-element-form-generator'
  Vue.component(FormGenerator)
```

## 2. FormGenerator的内置对象

* formData: 表单当前的数据
* params: 表单依赖的外部参数
* resetForm: 

| 名称 | 类型 | 含义 |
| --- | --- | --- |
| formData | 属性 | 表单当前的数据 |
| params | 属性 | 表单依赖的外部参数 |
| resetForm | 方法 | 取消表单所有的改动，将表单重置为初始状态 |
| setItemOption | 方法 | 设置表单字段的属性(id, type, name不能设置) |


## 3. 目前支持ElementUI原生的表单控件类型以及相应属性、事件的描述

### 3.1 Input(输入框)

* 属性

| 属性名称 | 数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String | 否 | '' | 默认值 |
| inputtype | String | 是 | 'text' | 类型包括H5默认的类型以及'textarea'，不推荐使用number |
| placeholder | String | 否 | '' | 占位文字(当值为空是默认显示的内容) |
| clearable | Boolean | 否 | true | 是否显示清空按钮 |
| showPassword | Boolean | 否 | false | 是否显示切换明文/密文按钮(仅当inputtype为'password'时可用) |
| size | String | 否 | 'medium' | 尺寸(可选值有medium/small/mini) |
| rows | Number | 否 | 3 | 文本行数(仅当inputtype为'textarea'时可用) |

* 事件

> (1) change事件: 值改变事件  

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | 视当前字段的数据类型而定 | 否 | 当前值 |
    
> (2) clear事件: 值清空事件，同时会自动触发change事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |

* 示例

> 一个普通的文本框

```
{
  type: 'text',
  id: 'simpletext',
  name: 'simpletext',
  label: '普通文本'
}
```

> 带有事件的文本框

```
{
  type: 'text',
  id: 'textWithEvent',
  name: 'textWithEvent',
  label: '带事件的文本框',
  event: {
    change(formCtx, value) {
      console.log(value)
      console.log(formCtx)
    },
    clear(formCtx) {
      console.log(formCtx)
    }
  }
}
```
    
### 3.2 Switch(开关)

* 属性

| 属性名称 | 数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String/Number/Boolean | 否 | inactiveValue的值 | 默认值 |
| activeValue | String/Number/Boolean | 否 | true | 打开状态下的取值 |
| inactiveValue | String/Number/Boolean | 否 | false | 关闭状态下的取值 |

* 事件
> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

* 示例

```
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
}
```

### 3.3 Number数字输入框

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | Number | 否 | 0 | 默认值 |
| min | Number | 否 | - | 最小值 |
| max | Number | 否 | - | 最大值 |
| step | Number | 否 | 1 | 步长 |
| precision | Number | 否 | 0 | 精确度 |
| size | String | 否 | 'large' | 尺寸(可选值为large/small) |
| controls | Boolean | 否 | true | 是否显示控制按钮 |

* 事件 

> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | Number | 否 | 当前值 |

> (2) focus事件: 聚焦事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| e | Event | 否 | 事件对象 |

> (3) blur事件: 失去焦点事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| e | Event | 否 | 事件对象 |

* 示例

> (1) 有最大和最小值

```
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
}
```

> (2) 带值改变事件

```
{
  type: 'number',
  id: 'number2',
  name: 'number2',
  width: 6,
  label: '数字2',
  min: 0,
  max: 1,
  precision: 2,
  step: 0.1,
  events: {
    change(formCtx, val) {
      console.log('当前值:', val)
    }
  }
}
```

### 3.4 Radio单选框

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String/Number | 否 | '' | 默认值 |
| button | Boolean | 否 | false | 是否采用按钮的方式显示 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| textColor | String | 否 | '#FFFFFF' | 选项激活时文本的颜色(button为true时可用) |
| fillColor | String | 否 | '#409EFF' | 选项激活时填充颜色和边框颜色(button为true时可用) |
| dictList | Array | 是 | [] | 选项列表 |
| textField | String | 是 | text | 标签域属性名称 |
| valueField | String | 是 | value | 值域属性名称 |

* 事件

> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

* 示例

```
{
  type: 'radio',
  id: 'radio1',
  name: 'radio1',
  width: 12,
  label: '单选框1',
  dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
  default: '2'
}
```

### 3.5 Checkbox复选框

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | Array | 否 | [] | 默认值 |
| button | Boolean | 否 | false | 是否采用按钮的方式显示 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| textColor | String | 否 | '#FFFFFF' | 选项激活时文本的颜色(button为true时可用) |
| fillColor | String | 否 | '#409EFF' | 选项激活时填充颜色和边框颜色(button为true时可用) |
| dictList | Array | 是 | [] | 选项列表 |
| textField | String | 是 | text | 标签域属性名称 |
| valueField | String | 是 | value | 值域属性名称 |
| max | Number | 否 | dataDict数组的长度 | 最多选择数量 |
| min | Number | 否 | 0 | 最少选择数量 |

* 事件

> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

* 示例

```
{
  type: 'checkbox',
  id: 'checkbox1',
  name: 'checkbox1',
  width: 12,
  label: '复选框1',
  dictList: [{'text': 11, 'value': '1'}, {'text': 22, 'value': '2'}, {'text': 33, 'value': '3'}],
  default: ['1']
}
```

### 3.6 Select下拉框

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String/Array | 否 | 单选: ''; 多选: [] | 默认值 |
| multiple | Boolean | 否 | false | 是否开启多选 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| clearable | Boolean | 否 | true | 是否显示清空按钮 |
| limit | Number | 否 | 0 | 最多可选数量(多选时可用，为0时不限制) |
| placeholder | String | 否 | '' | 占位文字(当值为空是默认显示的内容) |
| dictList | Array | 是 | [] | 选项列表 |
| textField | String | 是 | text | 标签域属性名称 |
| valueField | String | 是 | value | 值域属性名称 |

* 事件

> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

> (2) visible-change: 下拉框出现/隐藏事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| flag | Boolean | 否 | 显示为true，隐藏为false |

> (3) remove-tag: 移除选中tag(多选时可用)

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| tag | String/Number | 否 | 被移除的tag的值 |

> (4) clear: 清空选中选项

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |

> (5) blur: 失去焦点

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| e | Event | 否 | 事件对象 |

> (6) focus: 获得焦点

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| e | Event | 否 | 事件对象 |

* 示例

```
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
}
```

### 3.7 Button按钮

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| disabled | Boolean | 否 | false | 是否禁用 |
| btnType | String | 否 | 'primary' | 按钮类型 |
| plain | Boolean | 否 | false | 是否为朴素按钮 |
| round | Boolean | 否 | false | 是否有圆角 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| icon | String | 否 | '' | 图标 |

* 事件

> (1) click: 点击事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |

* 示例

```
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
}
```

### 3.8 Timepicker时间选择器

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String/Array | 否 | !isRange: ''<br /> isRange: ['', ''] | 默认值 |
| isRange | Boolean | 否 | false | 是否为时间范围选择 |
| editable | Boolean | 否 | false | 文本框是否允许编辑 |
| clearable | Boolean | 否 | true | 是否显示清除按钮 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| placeholder | String | 否 | '请选择时间' | 占位内容 |
| startPlaceholder | Sting | 否 | '请选择开始时间' | 开始时间的占位内容(isRange为true时可用) |
| endPlaceholder | Sting | 否 | '请选择结束时间' | 结束时间的占位内容(isRange为true时可用) |
| pickerOptions | Object | 否 | {} | 时间选择器的特殊选项 |
| valueFormat | String | 否 | 'HH:mm:ss' | 时间格式化的格式 |
| rangeSeparator | String | 否 | '-' | 分隔符(isRange为true时可用) |

* 事件

> (1) change: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

> (2) focus事件: 聚焦事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| component | VueComponent | 否 | 绑定的Vue组件实例 |

> (3) blur事件: 失去焦点事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| component | VueComponent | 否 | 绑定的Vue组件实例 |

### 3.9 Dimepicker日期选择器

* 属性

| 属性名称 |  数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| readonly | Boolean | 否 | false | 是否只读 |
| default | String/Array | 否 | year: ''<br />month: ''<br />date: ''<br />dates: []<br />week: ''<br />datetime: ''<br />datetimerange: ['', '']<br />daterange: ['', '']<br />monthrange: ['', ''] | 默认值 |
| inputtype | String | 否 | date | 日期选择器类型(同element官方文档的type) |
| editable | Boolean | 否 | false | 文本框是否允许编辑 |
| clearable | Boolean | 否 | true | 是否显示清除按钮 |
| size | String | 否 | 'medium' | 尺寸(可选值medium/small/mini) |
| placeholder | String | 否 | '请选择时间' | 占位内容 |
| startPlaceholder | Sting | 否 | '请选择开始时间' | 开始时间的占位内容(isRange为true时可用) |
| endPlaceholder | Sting | 否 | '请选择结束时间' | 结束时间的占位内容(isRange为true时可用) |
| pickerOptions | Object | 否 | {} | 时间选择器的特殊选项 |
| valueFormat | String | 否 | 根据inputtype类型决定 | 日期格式化的格式 |
| format | String | 否 | 和valueFormat相同 | 输入框中显示的格式化规则(默认和valueFormat相同) |
| rangeSeparator | String | 否 | '-' | 分隔符(isRange为true时可用) |
| defaultTime | Array | 否 | ['', ''] | 选中日期所使用的的当日具体时刻(inputtype为daterange/datetimerange时可用) |

* 事件

> (1) change: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值 |

> (2) focus事件: 聚焦事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| component | VueComponent | 否 | 绑定的Vue组件实例 |

> (3) blur事件: 失去焦点事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| component | VueComponent | 否 | 绑定的Vue组件实例 |

## 4. 自定义的表单控件
### 4.1 fill填充组件

* 属性

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| width | Number | 否 | 宽度(0~24整数) |

* 示例

> (1) 自适应宽度

```
{
  type: 'fill'
}
```

> (2) 自定义宽度

```
{
  type: 'fill',
  width: 20
}
```

* 备注
> 这是个填充栏位，用于需要另起一行时使用  
> 可以不填写宽度，默认填充整行，下一个栏位直接另起一行  
> 没有任何和数据相关的属性，也不会影响表单的配置和数据  
