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
    <customerService v-if="!isWxEnv"></customerService>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from 'vant'
import { success, queryRealTime } from '../../config/services.js'
import CustomerService from '../components/customerService.vue'
export default {
  name: 'success',
  components: {
    customerService: CustomerService,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
  },
  data() {
    return {
      merchant_order_no: '',
      spanPay: '缴款成功',
      url: '', //电子票地址
      isWxEnv: false,
    }
  },
  //加载生命周期
  created() {
    const that = this
    // 监听小程序中返回按钮
    if (window.addEventListener) {
      window.addEventListener(
        'popstate',
        function (e) {
          that.home()
        },
        false
      )
    }
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          console.log('微信小程序走查询')
          // 微信小程序
          that.isWxEnv = true
          const order_no = that.GetQueryValue('merchant_order_no')
          // const order_no = '220118150941032411'

          queryRealTime({
            merchant_order_no: order_no,
          }).then((res) => {
            if (res.code === 0) {
              console.log(res)
              ;(that.url = res.data.einvoice_url), (that.merchant_order_no = res.data.merchant_order_no)
            } else {
              that.$router.push({
                path: '/fail',
              })
            }
          })
        } else {
          that.goSuccess()
        }
      })
    } else {
      that.goSuccess()
    }

    // let rsa = url.substring(url.indexOf('=') + 1)
    // 下边是失败的
    // let rsa = '220118145303056498&merchant_no=5304002021121301'
    // 下边是成功的
    // let rsa = '220118150941032411'
  },
  methods: {
    goSuccess() {
      let url = location.href
      console.log('rsa---', rsa)
      success({
        rsa: rsa,
      }).then((res) => {
        if (res.code === 0) {
          ;(this.url = res.data.einvoice_url), (this.merchant_order_no = res.data.merchant_order_no)
        } else {
          this.$router.push({
            path: '/fail',
          })
        }
      })
    },
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
      const that = this
      const ua = window.navigator.userAgent.toLowerCase()
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.indexOf('alipay') != -1) {
        my.getEnv(function (res) {
          if (res.miniprogram) {
            my.reLaunch({
              url: '/pages/index/index',
            })
          }
        })
      } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            wx.miniProgram.reLaunch({ url: '/pages/index/index' })
          } else {
            that.$router.push({
              path: '/home',
            })
          }
        })
      } else {
        that.$router.push({
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
    width: 70%;
    height: 44px;
    background: linear-gradient(90deg, #0e3ea9, #3075d3);
    border-radius: 35px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border: 0;
  }
  button.cencel {
    width: 70%;
    height: 44px;
    background: white;
    border-radius: 35px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: black;
    border: 1px solid #5380e1;
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
</style>
