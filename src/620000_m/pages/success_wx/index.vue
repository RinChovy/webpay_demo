<template>
  <div class="mainwrap">
    <div class="div_img">
      <img v-if="yesOrNo == true" src="../../public/images/phone/success.png" alt="" />
      <div style="margin-top: 10px">
        <span v-if="yesOrNo == true">缴款成功</span>
      </div>
    </div>
    <div class="div_button" v-if="url != null">
      <button @click="einvoice_url" v-if="yesOrNo == true && einvoice_or == true">查看电子票</button>
    </div>
    <div class="div_button" else>
      <button @click="home" v-if="yesOrNo == true">返回首页</button>
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
      yesOrNo: false,
      einvoice_or: true, //是否显示电子票
    }
  },
  //加载生命周期
  created() {
    const order_no = this.$route.query.merchant_order_no
    // 挂件调用
    let ua = window.navigator.userAgent.toLowerCase()
    let that = this
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    queryRealTime({
      merchant_order_no: order_no,
    }).then((res) => {
      if (res.code === 0) {
        this.url = res.data.einvoice_url
        this.merchant_order_no = res.data.merchant_order_no
        this.yesOrNo = true
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
              that.einvoice_or = false
            }
          })
        }
      } else {
        this.$router.push({
          path: '/fail',
        })
      }
    })
  },
  methods: {
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
            wx.miniProgram.reLaunch({ url: '/pages/index/index' })
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
