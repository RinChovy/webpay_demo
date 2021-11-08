<template>
  <div class="mainwrap">
    <div class="div_img">
      <img src="../../public/images/phone/fail.png" alt="" />
      <div style="margin-top: 10px">
        <span style='color:#AFAFAF'>缴款失败</span>
      </div>
    </div>
    <div class="div_button">
      <button @click="home" :style="type == 'wx' ? 'color:#55B76B;border:1px solid #55B76B' : null">返回首页</button>
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
      type: 'web',
    }
  },
  created() {
    this.type = localStorage.getItem('type')
  },
  methods: {
    home() {
      this.$router.push({
        path: '/home',
      })
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
    width: 190px;
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
    border: 1px solid #EFCD99;
    font-size: 17px;
    color: #EFCD99;
    border-radius: 3px;
    background-color: white;
  }
}
</style>
