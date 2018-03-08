// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Alert from '../packages/alert/index.js'
import Message from '../packages/message/index.js'
import Notification from '../packages/notification/index.js'
import Dialog from '../packages/dialog/index.js'
import '../packages/theme-chalk/index.css'
const components = [
  Alert,
  Message,
  Notification,
  Dialog
]

const install = function (Vue, opts = {}) {
  components.map(function (component) {
    Vue.component(component.name, component)
  })
  Vue.prototype.$message = Message
  Vue.prototype.$notification = Notification
}
// Vue.component(Alert.name, Alert)
if (typeof window !== 'undefined') {
  // 客户端运行
  install(Vue)
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
