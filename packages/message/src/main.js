import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from '@/utils/popup';
import { isVNode } from '@/utils/vdom';

// Vue的构造器，参数是带有组件选项的对象
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let send = 1;

const Message = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let id = 'message_' + send++; 
  // 用户的关闭回调函数
  let userClose = options.onClose;
  options.onClose = function () {
    Message.close(id, userClose);
  };
  let instance = new MessageConstructor({
    data: options
  });

  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
}
const messageType = ['success', 'warning', 'info', 'error'];

messageType.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

// ['success', 'warning', 'info', 'error'].forEach(type => {
//   console.log(type)
// })

Message.close = function (id, userClose) {
  for (let len = instances.length, i = 0; i < len; i++) {
    if (instances[i].id === id) {
      if (typeof userClose === 'function') {
        userClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
}

Message.closeAll = function () {
  for (let i = instances.length - 1; i >=0; i--) {
    instances[i].close();
  }
}

export default Message;