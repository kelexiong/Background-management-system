import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: hot => `${hot}必须相同`
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '两次密码',
    isCheck: '协议'
  }
})

VeeValidate.Validator.extend('tongyi', {
  validate: val => val,
  getMessage: field => '请确认同一' + field
})
