
import laydate from 'layui-laydate'

import '../node_modules/layui-laydate/dist/theme/default/laydate.css'

import '../css/main.scss'

import common from '../js/common'
// console.log(common)
import Hot from '../js/hot_entry'
export default class Page {
  constructor () {

    this.init()
  }

  init () {

    this.delay(300)
      .then(() => {

        console.log('after_delay')
      })

    window.addEventListener('load', () => {

      new Hot()

      let mylaydate = laydate.render({
        elem: '.datepicker',
        range: true,
        mark: {
          '0-10-14': '生日'
          ,'0-12-31': '跨年' //每年的日期
          ,'0-0-7': '自定义' //每月某天
          ,'0-0-15': '月中'
          ,'2017-8-15': '' //如果为空字符，则默认显示数字+徽章
          ,'2099-10-14': '呵呵'
        },
        done: function(value, date) {
          // if(date.year === 2017 && date.month === 8 && date.date === 15){ //点击2017年8月15日，弹出提示语
          //   alert('这一天是：中国人民抗日战争胜利72周年');
          // }
          // console.log(value, date)
        },
        change: function(value, date, endDate){
          // console.log(value, date, endDate); //得到日期生成的值，如：2017-08-18
          // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
      })

      // console.log('mylaydate', mylaydate)
    }, false)
  }

  async delay (time) {

    await new Promise((resolve, reject) => {

      setTimeout(() => {
        // console.log('setTimeout')

        resolve()
      }, time);
    })

    // console.log('after_await')
  }
}

new Page()

if (module.hot) {
  module.hot.accept([
    '../js/hot_entry.js',
    // './css/main.css'
  ], function(a, b, c, d) {
    console.log('Accepting the updated printMe module!');
    console.log(a, b, c, d)
    // printMe()
    new Hot()
  })
}