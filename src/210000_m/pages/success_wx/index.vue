<template>
  <div class="box">
    <img class="top" src="../../public/images/icon/icon.png" />
    <div class="middle">
      <img src="../../public/images/phone/success.png" />
      <div>
        <span>缴款成功</span>
      </div>
    </div>
    <div class="bottom">
      <div class="div_button" v-if="url != null">
        <button @click="einvoice_url">查看电子票据</button>
      </div>
      <div class="div_button">
        <button class="cencel" @click="home">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import { queryRealTime } from '../../config/services.js'
export default {
  name: 'success',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
  },
  data() {
    return {
      merchant_order_no: '',
      spanPay: '缴款成功',
      url: '', //电子票地址
    }
  },
  //加载生命周期
  created() {
    const order_no = this.GetQueryValue('merchant_order_no')
    queryRealTime({
      merchant_order_no: order_no,
    }).then((res) => {
      if (res.code === 0) {
        console.log(res)
        ;(this.url = res.data.einvoice_url), (this.merchant_order_no = res.data.merchant_order_no)
      } else {
        this.$router.push({
          path: '/fail',
        })
      }
    })
  },
  methods: {
    GetQueryValue(queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return ''
      }
    },
    indexPay() {
      this.$router.push({
        path: '/index_pay',
      })
    },
    einvoice_url() {
      window.location.href = this.url
    },
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
            wx.miniProgram.switchTab({
              url: '/pages/index/index',
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
.blod {
  font-weight: bold;
}
.div_button {
  width: 100%;
  margin: 30px auto;
  text-align: center;
  button {
    width: 80%;
    height: 44px;
    background: #4a71b7;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border: 0;
  }
  button.cencel {
    width: 80%;
    height: 44px;
    background: white;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: black;
    border: 1px solid #4a71b7;
  }
}
.box {
  position: relative;
  width: 94%;
  margin: 50px auto 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  padding-top: 40px;
  img.top {
    position: absolute;
    left: 50%;
    top: -35px;
    margin-left: -35px;
    width: 70px;
  }
  .middle {
    width: 100%;
    height: 280px;
    text-align: center;
    img {
      margin-top: 50px;
      width: 200px;
    }
    span {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
    }
  }
  .bottom {
    width: 100%;
    // height: 200px;
    padding-bottom: 20px;
    border-top: 1px dotted #e5e5e5;
  }
}
.middle span {
  color: #4a71b7;
}
</style>
