<template>
  <div class="hello">
    <h1>This is hello</h1>
    <el-alert type ="success" title="成功" description="这是描述"></el-alert>
    <button type="button" class="btn" @click="btnClick">点击</button>
    <button type="button" class="btn" @click="btnClickLeft">点击1</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    btnClick() {
      const _self = this
      // _self.$message({
      //   message: '这是一条消息',
      //   type: 'success',
      //   duration: 0,
      //   showClose: true,
      //   onClose: function (vm) {
      //     console.log('用户关闭')
      //   }
      // })
      // _self.$message.success({
      //   message: '这是小学',
      //   showClose: true,
      //   duration: 4000
      // })
      _self.$notification({
        title: '提示',
        message: '这是信息',
        duration: 1000,
        type: 'success'
        // position: 'bottom-left',
        // offset: 200
      })
    },
    btnClickLeft() {
      this.$notification({
        title: '提示',
        message: '这是信息',
        duration: 1000,
        type: 'success',
        position: 'top-left'
        // offset: 200
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  display: inline-block;
  width: 120px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  line-height: 32px;
}
</style>
