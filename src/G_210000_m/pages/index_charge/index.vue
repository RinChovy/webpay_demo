<template>
  <div>
    <div class="box">
      <img src="../../public/images/icon/icon.png" />
      <div class="box_nei">
        <div class="top_logo">
          <span>{{ totalAmount }}元</span>
        </div>
        <div class="top_logo">
          <span style="color: #ee8835" v-if="status == '0'">等待缴款</span>
          <span style="color: #666666" v-else>已缴款</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">缴款码</span>
          <span class="left_two">{{ payCode }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">缴款人</span>
          <span class="left_two">{{ payer }}</span>
        </div> 
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">执收单位名称</span>
          <span class="left_two">{{ exeAgencyName }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">编制日期</span>
          <span class="left_two">{{ fillDate }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">项目信息</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="item_box" v-for="(v, k) in queryItem" :key="k">
          <span class="left">{{ v.itemName }}</span>
          <span class="right">{{ parseFloat(v.amt).toFixed(2) }}元</span>
        </div>
      </div>
      <div class="xian">
        <div class="box_nei">
          <div class="top">
            <!-- <img src="../../public/images/phone/shoufeih.png" /> -->
            <span class="left">缴款金额</span>
            <span class="left_two blod">{{ totalAmount }}元</span>
          </div>
        </div>
        <div class="box_nei">
          <div class="top">
            <span class="left">备注</span>
            <span class="left_two">{{ remarks }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="button" v-if="status == 0">
      <button @click="submit">确认支付</button>
    </div>
    <div class="button" v-else-if="einvoice_url != null">
      <button @click="einvoiceUrl">电子票地址</button>
    </div>
    <div class="button" v-else>
      <button @click="fanhui">返回</button>
    </div>
     <div id="widget" class="zhebg">
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import { createCashier } from '../../config/services.js'
// 自动生成商户订单号
import { guid } from '../../public/js/orderNo'
import API from '../../config/api.js'
export default {
  name: 'index_charge',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
  },
  data() {
    return {
      //商户号
      merchant_no: '',
      //缴款码
      payCode: '',
      //缴款人
      payer: '',
      //执收单位名称
      exeAgencyName: '',
      //收费项目
      queryItem: [],
      //编制日期
      fillDate: '',
      //缴纳金额
      totalAmount: '',
      //缴纳金额化为分
      totalAmount_fen: '',
      //备注
      remarks: '无',
      //缴款书状态
      status: '',
      //电子票地址
      einvoice_url: '',
      // 商户订单号
      order_no: guid(),
      //??
      miniProgramMark: false,
    }
  },
  //加载前生命周期
  beforeCreate() {
    console.log('加载前' + localStorage.getItem('data'))
  },
  //初始生命周期
  created() {
    const { order_no } = this
    const ua = window.navigator.userAgent.toLowerCase()
    console.log(order_no)
    // if (navigator.userAgent.indexOf('AlipayClient') > -1) {
    //   // 如果是支付宝则引入 支付宝js
    //   alert('这是支付宝')
    //   document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>')
    //   // util.loadScript("https://appx/web-view.min.js");
    // } else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
    //   // 否则就是在微信中 引入微信js
    //   alert('微信')
    //   document.writeln('<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"' + '>' + '<' + '/' + 'script>')
    //   // util.loadScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js");
    //   //  处理微信小程序内 webview 页面监听状态的方法
    // }

    //  处理微信小程序内 webview 页面监听状态的方法
    let that = this
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', that.sendMessage(), false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', that.sendMessage())
            document.attachEvent('onWeixinJSBridgeReady', that.sendMessage())
          }
        }
      })
    }

    console.log('加载后' + localStorage.getItem('data'))
    const dateString = JSON.parse(localStorage.getItem('data'))
    this.merchant_no = dateString.data.merchant_no
    this.payCode = dateString.data.payBook.payCode
    this.payer = dateString.data.payBook.payer
    this.exeAgencyName = dateString.data.payBook.exeAgencyName
    this.queryItem = JSON.parse(dateString.data.itemDetails)
    this.fillDate = this.time(dateString.data.payBook.fillDate)
    this.totalAmount = parseFloat(dateString.data.payBook.totalAmount / 100).toFixed(2)
    this.totalAmount_fen = dateString.data.payBook.totalAmount
    this.status = dateString.data.status
    this.einvoice_url = dateString.data.einvoice_url
  },
  methods: {
    sendMessage() {
      const { order_no } = this
      let that = this
      WeixinJSBridge.on('onPageStateChange', function (res) {
        if (res.active == true || res.active == 'true') {
          if (!that.miniProgramMark) {
            return
          }
          // 查询订单支付状态
          that.$router.push({
            path: '/success_wx',
            name: 'success_wx',
            query: { merchant_order_no: order_no },
          })
          // window.location.href = '<%=path%>/query/queryRealTime.do?' + 'merchant_order_no=' + order_no
        }
        console.log(res)
      })
    },
    submit() {
      let that = this
      const { order_no, merchant_no, totalAmount_fen, payCode } = this
      const dateString = JSON.parse(localStorage.getItem('data'))
      const query = dateString.data
      const queryJson = query.payBook

      // 挂件调用
      var ua = window.navigator.userAgent.toLowerCase()
      var openid = localStorage.getItem('openId')
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            // 走在小程序的逻辑
            // 微信小程序 监听页面变化
            that.miniProgramMark = true
            //收银台参数定义
            const widget_param = {
              paycode: payCode,
              // 微信小程序需要的字段 openid
              openid: openid,
            }
            const merchant_order_no = guid()
            const widget_content = {
              merchant_no: merchant_no,
              merchant_order_no: merchant_order_no,
              amount: totalAmount_fen,
              effective_time: '1c',
              version_no: '1.1',
              subject: 'subject',
              body: 'body',
              device_type: 'miniProgramH5',
              widget_param: widget_param,
            }
            const charge_param = {
              payCode: that.payCode,
              paymentName: that.payer,
              regionCode: API.region,
              frontCallBackUrl: API.callback,
            }
            createCashier({
              charge_param: JSON.stringify(charge_param),
              widget_content: JSON.stringify(widget_content),
              frontCallBackUrl: API.callback,
              merchantOrderNo: merchant_order_no,
            }).then((res) => {
              res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg)
            })
          } else {
            // 在微信浏览器中
            // 但不是小程序中
            //收银台参数定义
            const widget_param = {
              paycode: payCode,
              // 微信小程序需要的字段 openid
            }
            const merchant_order_no = guid()
            const widget_content = {
              merchant_no: merchant_no,
              merchant_order_no: merchant_order_no,
              amount: totalAmount_fen,
              effective_time: '1c',
              version_no: '1.1',
              subject: 'subject',
              body: 'body',
              device_type: 'phone',
              widget_param: widget_param,
            }
            const charge_param = {
              payCode: that.payCode,
              paymentName: that.payer,
              regionCode: API.region,
              frontCallBackUrl: API.callback,
            }
            createCashier({
              charge_param: JSON.stringify(charge_param),
              widget_content: JSON.stringify(widget_content),
              frontCallBackUrl: API.callback,
              merchantOrderNo: merchant_order_no,
            }).then((res) => {
              res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg)
            })
          }
        })
      } else if (ua.indexOf('alipay') != -1) {
        // 在支付宝浏览器中
        my.getEnv(function (res) {
          console.log(res.miniprogram) //true
          if (res.miniprogram) {
            // 在支付宝小程序中
            my.postMessage({ flag: 'getAuthCode' })
            // 接收来自小程序的消息。
            my.onMessage = function (e) {
              if (e.flag === 'authCode') {
                that.miniProgramMark = true
                //收银台参数定义
                const widget_param = {
                  paycode: payCode,
                  openid: e.authCode,
                  aliAppId: e.appId,
                }
                const merchant_order_no = guid()
                const widget_content = {
                  merchant_no: merchant_no,
                  merchant_order_no: merchant_order_no,
                  amount: totalAmount_fen,
                  effective_time: '1c',
                  version_no: '1.1',
                  subject: 'subject',
                  body: 'body',
                  device_type: 'miniProgramH5',
                  widget_param: widget_param,
                }
                const charge_param = {
                  payCode: that.payCode,
                  paymentName: that.payer,
                  regionCode: API.region,
                  frontCallBackUrl: API.callback,
                }
                createCashier({
                  charge_param: JSON.stringify(charge_param),
                  widget_content: JSON.stringify(widget_content),
                  frontCallBackUrl: API.callback,
                  merchantOrderNo: merchant_order_no,
                }).then((res) => {
                  res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg)
                })
              } else if (e.flag === 'paySuccess') {
                // todo 接受成功后 需要处理回调页面

                that.$router.push({
                  path: '/success_wx',
                  name: 'success_wx',
                  query: { merchant_order_no: order_no },
                })
                // window.location.href = '<%=path%>/query/queryRealTime.do?' + 'merchant_order_no=' + order_no
              }
            }
          } else {
            // 在支付宝浏览器中
            initWidget()
          }
        })
      } else {
        //收银台参数定义
        const widget_param = {
          paycode: payCode,
        }
        const merchant_order_no = guid()
        const widget_content = {
          merchant_no: merchant_no,
          merchant_order_no: merchant_order_no,
          amount: totalAmount_fen,
          effective_time: '1c',
          version_no: '1.1',
          subject: 'subject',
          body: 'body',
          device_type: 'phone',
          widget_param: widget_param,
        }
        const charge_param = {
          payCode: that.payCode,
          paymentName: that.payer,
          regionCode: API.region,
          frontCallBackUrl: API.callback,
        }
        createCashier({
          charge_param: JSON.stringify(charge_param),
          widget_content: JSON.stringify(widget_content),
          frontCallBackUrl: API.callback,
          merchantOrderNo: merchant_order_no,
        }).then((res) => {
          res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg)
        })
      }
    },
    showCashier(pageParams) {
      document.write(pageParams)
    },
    // 失败提示
    handleError(err) {
      Dialog.alert({
        message: err,
      }).then(() => {})
    },
    fanhui() {
      window.history.go(-1)
    },
    einvoiceUrl() {
      window.location.href = this.einvoice_url
    },
    // 填制日期格式化
    time(date) {
      var fillDate = date
      var fillDateStr = fillDate.substr(0, 4) + '-' + fillDate.substr(4, 2) + '-' + fillDate.substr(6, 2)
      return fillDateStr
    },
  },
}
</script>

<style scoped lang="scss">
.blod {
  font-weight: bold;
}
.button {
  width: 100%;
  margin-top: 30px;
  text-align: center;
  button {
    width: 90%;
    height: 46px;
    background: #4a71b7;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border: 0;
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
  img {
    position: absolute;
    left: 50%;
    top: -35px;
    margin-left: -35px;
    width: 70px;
  }
  .box_nei {
    width: 92%;
    margin: 0 auto;
    .top_logo {
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        font-size: 16px;
        font-family: PingFang SC;
      }
    }
    .top {
      display: flex;
      padding-top: 10px;
      align-items: baseline;
      width: 100%;
      min-height: 40px;
      img {
        position: absolute;
        top: 18px;
        width: 20px;
      }
      .left {
        flex: 1;
        font-size: 16px;
        font-family: PingFang SC;
        color: #999999;
      }
      .left_two {
        flex: 2;
        font-size: 16px;
        font-family: PingFang SC;
        color: #464a4c;
        text-align: right;
      }
    }
    .bottom {
      position: relative;
      width: 100%;
      height: 40px;
      span {
        position: absolute;
        top: 10px;
        left: 0;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #464a4c;
      }
    }
  }
  .item_box {
    width: 100%;
    margin: 10px auto;
    display: flex;

    span {
      font-size: 15px;
    }
    .left {
      color: #999999;
      flex: 2;
    }
    .right {
      text-align: right;
      flex: 1;
    }
  }
  .xian {
    width: 100%;
    border-top: 1px dashed #f3f3f3;
    padding-bottom: 4px;
  }
}
</style>
