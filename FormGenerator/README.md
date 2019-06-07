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


## 3. 支持的表单控件类型以及相应属性、事件的描述

### 3.1 Input(输入框)

* 属性

| 属性名称 | 数据类型 | 是否必输 | 默认值 | 含义 |
| ----- | ----- | ----- | ----- | ----- |
| id | String | 是 | '' | 组件ID |
| name | String | 是 | '' | 组件的name属性(v-model绑定值) |
| label | String | 是 | '' | 组件标题 |
| visible | Boolean | 是 | true | 是否可见 |
| width | Number | 是 | 0 | 宽度(0~24整数) |
| inputtype | String | 是 | 'text' | 类型包括H5默认的类型以及'textarea'，不推荐使用number |
| placeholder | String | 否 | '' | 占位文字(当值为空是默认显示的内容) |
| clearable | Boolean | 否 | true | 是否显示清空按钮 |
| showPassword | Boolean | 否 | false | 是否显示切换明文/密文按钮(仅当inputtype为'password'时可用) |
| readonly | Boolean | 否 | false | 是否只读 |
| size | String | 否 | 'medium' | 尺寸，可选项有: 'medium', 'small', 'mini' |
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
| activeValue | String/Number/Boolean | 否 | true | 打开状态下的取值 |
| inactiveValue | String/Number/Boolean | 否 | false | 关闭状态下的取值 |
| readonly | Boolean | 否 | false | 是否只读 |

* 事件
> (1) change事件: 值改变事件

| 参数名称 | 数据类型 | 是否必输 | 参数含义 |
| ----- | ----- | ----- | ----- |
| formCtx | Object | 是 | 表单可操作对象 |
| value | String/Number/Boolean | 否 | 当前值(类型视activeValue和inactiveValue的类型而定) |
