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
        <div v-for="(v, k) in good" :key="k">
          <div class="form_span">
            <span>{{ v }}</span
            ><span class="right">{{ parseFloat(1).toFixed(2) }}元</span>
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
      <div class="button_box" v-else-if="einvoice_url != ''">
        <button @click="einvoiceUrl">电子票地址</button>
      </div>
      <div class="button_box" else></div>
    </div>
    <img class="paied" src="../../public/images/phone/paied.png" />
  </div>
</template>

<script>
import { Button, Row, Col, Search } from "vant";
// 大写金额
import {Arabia_to_Chinese} from '../../public/js/money'
// 自动生成商户订单号
import {guid} from '../../public/js/orderNo'
import API from "../../config/api.js";
export default {
  name: "index_charge",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
  },
  data() {
    return {
      good: ["a1", "b2", "c3", "d4"],
      //缴款码
      payCode: "缴款码",
      //缴款人
      payer: "缴款人",
      //执收单位名称
      exeAgencyName: "执收单位名称",
      //收费项目
      queryItem: [],
      //编制日期
      fillDate: "编制日期",
      //缴纳金额
      totalAmount: guid(),
      //备注
      remarks: "无",
      //缴款书状态
      status: 0,
      //电子票地址
      einvoice_url: "",
    };
  },
  //加载前生命周期
  beforeCreate() {
    console.log(this.$route.params)
  },
  //初始生命周期
  created() {},
  methods: {
    submit() {
      console.log("这里是缴款插件");
    },
    einvoiceUrl() {
      console.log("这里是电子票");
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
    vertical-align: 5px;
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
