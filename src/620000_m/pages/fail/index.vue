<template>
  <div class="mainwrap">
    <div class="div_img">
      <img src="../../public/images/phone/fail.png" alt="" />
      <div style="margin-top: 10px">
        <span>缴款失败</span>
      </div>
    </div>
    <div class="div_button">
      <button @click="home">返回首页</button>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from 'vant'
export default {
  name: 'success',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
  },
  data() {
    return {
      value: 'value',
      good: 'value',
      bottom_span: '主办单位：鹤岗市财政局',
    }
  },
  methods: {
    home() {
      const ua = window.navigator.userAgent.toLowerCase()
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.indexOf('alipay') != -1) {
        my.getEnv(function (res) {
          console.log(res.miniprogram) //true
          if (res.miniprogram) {
            my.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            wx.miniProgram.reLaunch({url: '/pages/index/index'})
          } else {
            this.$router.push({
              path: '/home',
            })
          }
        })
      } else {
        this.$router.push({
          path: '/home',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.div_img {
  width: 100%;
  text-align: center;
  img {
    margin-top: 56%;
  }
  span {
    font-size: 16px;
    color: #464a4c;
    font-weight: bold;
    margin-top: 20px;
  }
}
.div_button {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  button {
    width: 140px;
    height: 40px;
    border: 1px solid #4690ff;
    font-size: 17px;
    color: #4690ff;
    border-radius: 3px;
    background-color: white;
  }
}
</style>
