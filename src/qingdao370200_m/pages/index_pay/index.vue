<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/paycode.png" />
          <span>缴款码</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入缴款码" v-model="payCode" />
        </div>
        <div class="form_input_warn">
          <span>{{ payCodeWarn }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/payname.png" />
          <span>缴款人</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入缴款人" v-model="payPeople" />
        </div>
        <div class="form_input_warn">
          <span>{{ payPeopleWarn }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/code.png" />
          <span>验证码</span>
        </div>
        <div class="form_input_code">
          <input placeholder="请输入验证码" v-model="code" />
          <img :src="codeUrlT" />
          <span style="color: #4690ff" @click="changeCode">换一张</span>
        </div>
        <div class="form_input_warn">
          <span>{{ codeWarn }}</span>
        </div>
      </div>
      <div class="button_box">
        <button @click="submit">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from "vant";
import API from "../../config/api.js";
export default {
  name: "index_pay",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
  },
  data() {
    return {
      good: "value",
      bottom_span: "主办单位：鹤岗市财政局",
      // 固定地址
      codeUrl: API.code,
      // 时间戳验证码地址
      codeUrlT: API.code,
      // 绑定缴款码
      payCode: "",
      // 绑定缴款码验证语言
      payCodeWarn: "",
      // 绑定缴款人
      payPeople: "",
      // 绑定缴款人验证语言
      payPeopleWarn: "",
      // 绑定验证码
      code: "",
      // 绑定缴款码验证语言
      codeWarn: "",
    };
  },
  methods: {
    //验证码时间戳
    chgUrl(url) {
      var timestamp = new Date().valueOf();
      url = url.substring(0, 50);
      if (url.indexOf("&") >= 0) {
        url = url + "×tamp=" + timestamp;
      } else {
        // url = url + '?timestamp=' + timestamp;
        url = url + "?timestamp=" + timestamp;
      }
      return url;
    },
    // 改变验证码
    changeCode() {
      let newCode = this.chgUrl(this.codeUrl);
      this.codeUrlT = newCode;
    },
    //提交下一步
    submit() {
      this.warning();
      if (
        this.payCodeWarn == "" &&
        this.payPeopleWarn == "" &&
        this.codeWarn == ""
      ) {
        let data = {
          payCode: this.payCode,
          payPeople: this.payPeople,
          code: this.code,
        };
        this.$router.push({
          path: "/index_charge",
          name: "index_charge",
        });
      } else {
      }
    },
    //验证方法
    warning() {
      this.payCode == ""
        ? (this.payCodeWarn = "请输入缴款码")
        : /^21\d{18}$/.test(this.payCode)
        ? (this.payCodeWarn = "")
        : (this.payCodeWarn = "缴款码必须等于20位且21开头");
      this.payPeople == ""
        ? (this.payPeopleWarn = "请输入缴款人")
        : (this.payPeopleWarn = "");
      this.code == "" ? (this.codeWarn = "请输入验证码") : (this.codeWarn = "");
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  height: 100px;
  padding-top: 20px;
}
.form_box {
  width: 100%;
  height: 110px;
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
.form_input {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  input {
    color: #999ea0;
    font-size: 17px;
    padding-left: 10px;
    height: 35px;
    background-color: #f4f4f4;
    border: 0px solid #ddd;
    width: 90%;
    border-radius: 4px;
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
