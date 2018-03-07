<template>
  <transition name="el-notification-fade">
    <div
      :class="['el-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <i
        class="el-notification__icon"
        :class="[ typeClass, iconClass ]"
        v-if="type || iconClass">
      </i>
      <div class="el-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="el-notification__title" v-text="title"></h2>
        <div class="el-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          class="el-notification__closeBtn el-icon-close"
          v-if="showClose"
          @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  data() {
    return {
      visible: false,
      title: '',
      message: '',
      dangerouslyUseHTMLString: '',
      duration: 4500,
      type: '',
      iconClass: '',
      customClass: '',
      position: 'top-right',
      showClose: true,
      onClose: null,
      onClick: null,
      closed: false,
      timer: null,
      verticalOffset: 10
    }
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type] ? `el-icon-${typeMap[this.type]}` : '';
    },
    horizontalClass() {
      return this.position.indexOf('right') > -1 ?'right' : 'left';
    },
    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${ this.verticalOffset }px`
      }
    }
  },
  watch: {
    closed(newVal) {
      if(newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    keydown(e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        // 取消定时
        this.clearTimer();
      } else if (e.keyCode === 27) {
        // keyCode = 27为ESC
        if (!this.closed) {
          this.close();      
        }
      } else {
        //回复倒计时
        this.startTimer();
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        //使用箭头函数，不然this绑定的是window
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    destroyElement() {
      this.$el.removeEventListener('transitoned', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    click() {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.addEventListener('keydown', this.keydown);
  }
}
</script>