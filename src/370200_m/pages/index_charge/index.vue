<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/paycode.png" />
          <span>缴款码</span>
        </div>
        <div class="form_span">
          <span>{{ payCode }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/paypeople.png" />
          <span>缴款人</span>
        </div>
        <div class="form_span">
          <span>{{ payer }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/danwei.png" />
          <span>执收单位名称</span>
        </div>
        <div class="form_span">
          <span>{{ exeAgencyName }}</span>
        </div>
      </div>
      <div class="form_box" style="height: auto">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/xiangmu.png" />
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
          <img alt='' src="../../public/images/phone/bianzhih.png" />
          <span>编制日期</span>
        </div>
        <div class="form_span">
          <span>{{ fillDate }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/jiaonah.png" />
          <span>缴纳金额</span>
        </div>
        <div class="form_span">
          <span style="color: red; font-weight: bold">{{ totalAmount }}元</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img alt='' src="../../public/images/phone/beizhuh.png" />
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
    <img alt=''
      class="paied"
      src="../../public/images/phone/paied.png"
      v-if="status != 0"
    />
    <div id="widget" class="zhebg">
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from "vant";
// 大写金额
import { Arabia_to_Chinese } from "../../public/js/money";
// 自动生成商户订单号
import { guid } from "../../public/js/orderNo";
import API from "../../config/api.js";
export default {
  name: "index_charge",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
    "van-dialog": Dialog,
  },
  data() {
    return {
      //商户号
      merchant_no: this.$route.params.data.merchant_no,
      //缴款码
      payCode: this.$route.params.data.payBook.payCode,
      //缴款人
      payer: this.$route.params.data.payBook.payer,
      //执收单位名称
      exeAgencyName: this.$route.params.data.payBook.exeAgencyName,
      //收费项目
      queryItem: JSON.parse(this.$route.params.data.itemDetails),
      //编制日期
      fillDate: this.time(this.$route.params.data.payBook.fillDate),
      //缴纳金额
      totalAmount: parseFloat(
        this.$route.params.data.payBook.totalAmount / 100
      ).toFixed(2),
      //备注
      remarks: "无",
      //缴款书状态
      status: this.$route.params.data.status,
      //电子票地址
      einvoice_url: this.$route.params.data.einvoice_url,
    };
  },
  //加载前生命周期
  beforeCreate() {
    console.log(this.$route.params);
  },
  //初始生命周期
  created() {
    console.log(this.$route.params);
  },
  methods: {
    submit() {
      let userId = localStorage.getItem("userId");
      let openid = localStorage.getItem("openid");
      // 挂件调用
      if (
        "" != typeof userId &&
        typeof userId != "undefined" &&
        "null" != typeof userId
      ) {
        thirdpay_widget.init({
          container: "widget", //挂件在当前页面放置的控件ID
          merchant_no: this.merchant_no, //分配的商户号
          merchant_order_no: guid(), //订单在商户系统中的订单号
          amount: this.$route.params.data.payBook.totalAmount, //订单价格，单位：人民币 分
          effective_time: "1c",
          device_type: "phone", //设备类型
          widget_param: {
            paycode: this.payCode,
          }, //控件参数，常用来传递缴款服务所需定义的内容，如，非税paycode直缴或传入相关缴费信息生成缴款书
          charge_url: API.createCharge, //商户服务端创建charge时的controller地址
          //适用于开放平台的订单字段
          userId: userId,
          paymentName: this.exeAgencyName,
          itemNameSet: this.queryItem,
          charge_param: {
            openid: openid,
            b: "b",
            regionCode: API.region,
            frontCallBackUrl: API.callback,
          }, //(可选，用户自定义参数，若存在自定义参数则会通过 POST 方法透传给 charge_url
          version_no: "1.1",
        });
      } else {
        thirdpay_widget.init({
          container: "widget", //挂件在当前页面放置的控件ID
          merchant_no: this.merchant_no, //分配的商户号
          merchant_order_no: guid(), //订单在商户系统中的订单号
          amount: this.$route.params.data.payBook.totalAmount, //订单价格，单位：人民币 分
          effective_time: "1c",
          device_type: "phone", //设备类型
          widget_param: {
            paycode: this.payCode,
          }, //控件参数，常用来传递缴款服务所需定义的内容，如，非税paycode直缴或传入相关缴费信息生成缴款书
          charge_url: API.createCharge, //商户服务端创建charge时的controller地址
          charge_param: {
            a: "a",
            b: "b",
            regionCode: API.region,
            frontCallBackUrl: API.callback,
          }, //(可选，用户自定义参数，若存在自定义参数则会通过 POST 方法透传给 charge_url
          version_no: "1.1",
        });
      }
    },
    fanhui() {
      window.history.go(-1);
    },
    einvoiceUrl() {
      window.location.href = this.einvoice_url;
    },
    // 填制日期格式化
    time(date) {
      var fillDate = date;
      var fillDateStr =
        fillDate.substr(0, 4) +
        "-" +
        fillDate.substr(4, 2) +
        "-" +
        fillDate.substr(6, 2);
      return fillDateStr;
    },
  },
};
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
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #4690ff),
      color-stop(100%, #556ffe)
    );
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 19px;
  }
}
</style>
