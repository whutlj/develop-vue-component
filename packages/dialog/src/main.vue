<template>
  <div class="nr-dialog" :style="{'width': width}">
    this is new rank dialog
    <slot></slot>
  </div>
</template>
<script type="text/babel">
import Popup from '@/utils/popup'
import emitter from '@/mixins/emitter'
export default {
  name: 'NrDialog',

  mixins: [Popup, emitter],

  data() {
    return {
      visible: false,
      width: '50%',
      title: ''
    }
  },
  mounted() {
    console.log(this.$children)
  }
}
</script>
<style scoped>
  .nr-dialog {

  }
</style>