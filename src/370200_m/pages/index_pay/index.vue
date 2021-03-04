<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img alt="" src="../../public/images/paycode.png" />
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
          <img alt="" src="../../public/images/payname.png" />
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
          <img alt="" src="../../public/images/code.png" />
          <span>验证码</span>
        </div>
        <div class="form_input_code">
          <input placeholder="请输入验证码" v-model="code" />
          <img alt="" :src="codeUrlT" />
          <span style="color: #4690ff; font-size: 12px" @click="changeCode"
            >换一张</span
          >
        </div>
        <div class="form_input_warn">
          <span>{{ codeWarn }}</span>
        </div>
      </div>
      <div class="button_box">
        <button @click="submit">下一步</button>
      </div>
      <div class="footerc" style="line-height: 0.42rem; margin-top: 2.4rem">
        <span style="display: block">版本所有：青岛市财政局</span>
        <span style="display: block">技术支持：福建博思软件股份有限公司</span>
        <span style="display: block">支持电话：010-53520976</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from "vant";
import API from "../../config/api.js";
import {
  queryPayInfo,
  getOpenid,
  getOpenPlatformUserid,
} from "../../config/services.js";
export default {
  name: "index_pay",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
    "van-dialog": Dialog,
  },
  data() {
    return {
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
  mounted() {
    // getOpenid({
    //   code: "041Gx5Ga1yjoBA0WerGa1Ideo13Gx5Gt",
    // }).then((data) => {
    //   if (data.code === 0) {
    //     getOpenPlatformUserid({
    //       openid: data.data.openid,
    //     }).then((resData) => {
    //       if (resData.code === 0) {
    //         localStorage.removeItem("userId");
    //         localStorage.setItem("userId", resData.data.user_id);
    //       } else {
    //         Dialog.alert({
    //           message: res.msg,
    //         }).then(() => {
    //           // on close
    //         });
    //       }
    //     });
    //   } else {
    //     Dialog.alert({
    //       message: res.msg,
    //     }).then(() => {
    //       // on close
    //     });
    //   }
    // });
    if (navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1) {
      // 否则就是在微信中 引入微信js
      // document.writeln('<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"' + '>' + '<' + '/' + 'script>');
      // util.loadScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js");
      //  处理微信小程序内 webview 页面监听状态的方法
      var url = location.href.split("#")[0];
      let state = this.GetQueryValue("state");
      console.log("url" + url);
      console.log("start" + state);
      if (typeof state != "undefined" && "" != typeof state) {
        if (state == "cityService") {
          // 验证是城市服务
          // 获取code
          let code = this.GetQueryValue("code");
          console.log("code" + code);
          getOpenid({
            code: code,
          }).then((data) => {
            if (data.code === 0) {
              localStorage.removeItem("openid");
              localStorage.setItem("openid", data.data.openid);
              alert("存储openid==" + data.data.openid);
              getOpenPlatformUserid({
                openid: data.data.openid,
              }).then((resData) => {
                if (resData.code === 0) {
                  localStorage.removeItem("userId");
                  localStorage.setItem("userId", resData.data.user_id);
                  alert("存储userid==" + resData.data.user_id);
                } else {
                  Dialog.alert({
                    message: resData.msg,
                  }).then(() => {
                    // on close
                  });
                }
              });
            } else {
              Dialog.alert({
                message: data.msg,
              }).then(() => {
                // on close
              });
            }
          });
        }
      }
    }
  },
  methods: {
    GetQueryValue(queryName) {
      var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      } else {
        return "";
      }
    },
    //验证码时间戳
    chgUrl(url) {
      var timestamp = new Date().valueOf();
      // url = url.substring(0, 50);
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
        queryPayInfo({
          payCode: this.payCode,
          payPeople: this.payPeople,
          code: this.code,
        }).then((res) => {
          res.code === 0
            ? this.$router.push({
                path: "/index_charge",
                name: "index_charge",
                params: res,
              })
            : Dialog.alert({
                message: res.msg,
              }).then(() => {
                // on close
              });
        });
      }
    },
    //验证方法
    warning() {
      const regular = API.regular;
      console.log(regular);
      this.payCode == ""
        ? (this.payCodeWarn = "请输入缴款码")
        : eval(regular).test(this.payCode)
        ? (this.payCodeWarn = "")
        : (this.payCodeWarn = API.regularText);
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
    vertical-align: -3px;
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
.footerc {
  font-size: 0.22px;
  color: #999ea0;
  text-align: center;
  // height:0.92rem;
}
</style>
