<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/paycode.png" />
          <span>缴款码</span>
        </div>
        <div class="form_span">
          <span>{{ payCode }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/paypeople.png" />
          <span>缴款人</span>
        </div>
        <div class="form_span">
          <span>{{ payer }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/danwei.png" />
          <span>执收单位名称</span>
        </div>
        <div class="form_span">
          <span>{{ exeAgencyName }}</span>
        </div>
      </div>
      <div class="form_box" style="height: auto">
        <div class="form_label">
          <img src="../../public/images/phone/xiangmu.png" />
          <span>收费项目</span>
        </div>
        <div v-for="(v, k) in queryItem" :key="k">
          <div class="form_span">
            <span>{{ v.itemName }}</span
            ><span class="right">{{ parseFloat(v.amt).toFixed(2) }}元</span>
          </div>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/bianzhih.png" />
          <span>编制日期</span>
        </div>
        <div class="form_span">
          <span>{{ fillDate }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/jiaonah.png" />
          <span>缴纳金额</span>
        </div>
        <div class="form_span">
          <span style="color: red; font-weight: bold">{{ totalAmount }}元</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/phone/beizhuh.png" />
          <span>备注</span>
        </div>
        <div class="form_span">
          <span>{{ remarks }}</span>
        </div>
      </div>
      <div class="button_box" v-if="status == 0">
        <button @click="submit">确认支付</button>
      </div>
      <div class="button_box" v-else-if="einvoice_url != null">
        <button @click="einvoiceUrl">电子票地址</button>
      </div>
      <div class="button_box" v-else>
        <button @click="fanhui">返回</button>
      </div>
    </div>
    <img
      class="paied"
      src="../../public/images/phone/paied.png"
      v-if="status != 0"
    />
    <div id="widget" class="zhebg">
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import { createCashier } from '../../config/services.js'
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
    //收银台逻辑
    submit() {
      let that = this
      const dateString = JSON.parse(localStorage.getItem('data'))
      const query = dateString.data
      const queryJson = query.payBook
      //收银台参数定义
      const widget_param = {
        paycode: queryJson.payCode,
        paymentName: queryJson.payer,
      }
      const merchant_order_no = guid()
      const widget_content = {
        merchant_no: query.merchant_no,
        merchant_order_no: merchant_order_no,
        amount: queryJson.totalAmount,
        effective_time: '1c',
        version_no: '1.1',
        subject: 'subject',
        body: 'body',
        device_type: 'phone',
        widget_param: widget_param,
      }
      const charge_param = { payCode: this.payCode, paymentName: this.payer }
      createCashier({
        charge_param: JSON.stringify(charge_param),
        widget_content: JSON.stringify(widget_content),
        frontCallBackUrl: API.callback,
        merchantOrderNo: merchant_order_no,
      }).then((res) => {
        res.code === 0 ? that.showCashier(res.msg) : that.handleError(res.msg)
      })
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
.paied {
  position: absolute;
  width: 100px;
  top: 68px;
  right: 50px;
}
.form {
  width: 100%;
  height: 100px;
  padding-top: 20px;
}
.form_box {
  width: 100%;
  height: 80px;
}
.form_label {
  img {
    margin-left: 4%;
    width: 25px;
  }
  span {
    margin-left: 5px;
    vertical-align: -3px;
    font-size: 18px;
    font-weight: bold;
  }
}
.form_span {
  position: relative;
  margin: 10px auto;
  width: 90%;
  span {
    font-size: 17px;
    color: #4690ff;
  }
  span.right {
    position: absolute;
    right: 0;
  }
}
.form_input_warn {
  width: 100%;
  margin-top: 8px;
  span {
    margin-left: 5%;
    font-size: 13px;
    color: red;
  }
}

.form_input_code {
  margin-top: 10px;
  width: 100%;
  input {
    color: #999ea0;
    font-size: 17px;
    padding-left: 10px;
    height: 35px;
    background-color: #f4f4f4;
    border: 0px solid #ddd;
    width: 46%;
    margin-left: 4%;
    border-radius: 4px;
  }
  img {
    vertical-align: -12px;
    width: 86px;
    height: 35px;
  }
}

.button_box {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  button {
    width: 94%;
    height: 44px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #4690ff), color-stop(100%, #556ffe));
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 19px;
  }
}
</style>
