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
// 大写金额
import { Arabia_to_Chinese } from '../../public/js/money'
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
    }
  },
  //加载前生命周期
  beforeCreate() {},
  //初始生命周期
  created() {
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
    submit() {
      // 挂件调用
      thirdpay_widget.init({
        container: 'widget', //挂件在当前页面放置的控件ID
        merchant_no: this.merchant_no, //分配的商户号
        merchant_order_no: guid(), //订单在商户系统中的订单号
        amount: this.totalAmount_fen, //订单价格，单位：人民币 分
        effective_time: '1c',
        device_type: 'phone', //设备类型
        widget_param: {
          paycode: this.payCode,
        }, //控件参数，常用来传递缴款服务所需定义的内容，如，非税paycode直缴或传入相关缴费信息生成缴款书
        charge_url: API.createCharge, //商户服务端创建charge时的controller地址
        charge_param: {
          a: 'a',
          b: 'b',
          regionCode: API.region,
          frontCallBackUrl: API.callback,
        }, //(可选，用户自定义参数，若存在自定义参数则会通过 POST 方法透传给 charge_url
        version_no: '1.1',
      })
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
    width: 70%;
    height: 44px;
    background: linear-gradient(90deg, #df9d8b, #e8bb99);
    border-radius: 17px;
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
        font-weight: 600;
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

