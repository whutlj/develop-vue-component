import Vue from 'vue'
import Main from './main.vue'
import {PopupManager} from '@/utils/popup'
import {isVNode} from '@/utils/vdom'

let instance
let instances = []
let send = 1

const typeArr = ['success', 'info', 'warning', 'error']
const NotificationConstructor = Vue.extend(Main)
const Notification = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let id = 'notification_' + send++
  let position = options.position || 'top-right'//设置默认的值

  instance = new NotificationConstructor({
    data: options
  })
  let userClose = options.onClose
  options.onClose = function () {
    Notification.close(id, userClose)
  }

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message]
    options.message = 'REPLYACED_BY_VNODE'
  }
  // 设置提示框的位置
  // 垂直方向上多个提示框的时候怎么处理
  let verticalOffset = options.offset || 0
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.verticalOffset = verticalOffset
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = PopupManager.nextZIndex()
  instances.push(instance)
  return instance.vm
}

typeArr.forEach(type => {
  Notification[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Notification(options)
  }
})

Notification.close = function (id, userClose) {
  let len = instances.length
  for (let i = 0 ; i < len; i++) {
    if (instances[i].id === id) {
      let height = instances[i].$el.offsetHeight + 16
      instances.splice(i, 1)
      if (typeof userClose === 'function') {
        userClose(instances[i])
      }
      len = instances.length
      for (let j = i; j < len; j++) {
        let position = /^top-/.test(instances[j].position) ? 'top' : 'bottom' 
        let instanceOffset = instances[j].verticalOffset - height
        if (position === 'top') {
          instances[j].$el.style.top = `${ instanceOffset }px`
        } else {
          instances[j].$el.style.bottom =  `${ instanceOffset }px`
        }
      }
      //重新设置实例的位置
      
    }
  }
}

Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i++) {
    instances[i],close()
  }
}

export default Notification;