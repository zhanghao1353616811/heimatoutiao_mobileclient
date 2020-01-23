/**
 * 日期时间处理
 */

import Vue from 'vue'
import moment from 'moment'

// 配置中文语言
// 查看moment/locale 中的语言文件 使用文件名
moment.locale('zh-cn')

// 参数1:过滤器的名称
// 参数2:一个函数

// 参数1:使用过滤器的数据
// {{value|relativeTime}}
// 返回值: 数据 输出到使用过滤器的表达式中

Vue.filter('relativeTime', value => {
  // value 谁用过滤器 value就是谁 其实就是一个方法 传了一个参数 返回一个值
  // console.log(value)
  return moment(value).startOf('second').fromNow() // 计算相对时间 传入的时间 给转化成moment自己的日期格式对象
  // startOf().formNOw() 相对现在 开始计算时间 参数 'hour'相对时间精度
})
