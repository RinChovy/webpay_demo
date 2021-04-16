<template>
  <div class="mainwrap">
    <div class="top">
      <div :class="leftOrRight == 'left' ? 'top_box top_box_hover ' : 'top_box un_top_box_hover'" @click="leftButton">
        <span>按缴款码查询</span>
      </div>
      <div :class="leftOrRight == 'right' ? 'top_box top_box_hover' : 'top_box un_top_box_hover'" @click="rightButton">
        <span>按身份证号查询</span>
      </div>
    </div>
    <!-- 按缴款码查询 -->
    <div class="form" v-if="leftOrRight == 'left'">
      <div class="form_box">
        <div class="form_label">
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
          <span>验证码</span>
        </div>
        <div class="form_input_code">
          <input placeholder="请输入验证码" v-model="code" />
          <img alt="" :src="codeUrlT" />
          <span style="color: #4690ff" @click="changeCode">换一张</span>
        </div>
        <div class="form_input_warn">
          <span>{{ codeWarn }}</span>
        </div>
      </div>
      <div class="button_box">
        <button @click="submit" v-if="disabled == true">下一步</button>
        <button @click="submit" disabled="disabled" v-else>下一步</button>
      </div>
    </div>
    <!-- 按身份证号查询 -->
    <div class="form" v-else>
      <div class="form_box">
        <div class="form_label">
          <span>身份证号</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入身份证号" v-model="card_payCode" />
        </div>
        <div class="form_input_warn">
          <span>{{ card_payCodeWarn }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <span>缴款人</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入缴款人" v-model="card_payPeople" />
        </div>
        <div class="form_input_warn">
          <span>{{ card_payPeopleWarn }}</span>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <span>验证码</span>
        </div>
        <div class="form_input_code">
          <input placeholder="请输入验证码" v-model="card_code" />
          <img alt="" :src="card_codeUrlT" />
          <span style="color: #4690ff" @click="card_changeCode">换一张</span>
        </div>
        <div class="form_input_warn">
          <span>{{ card_codeWarn }}</span>
        </div>
      </div>
      <div class="button_box">
        <button @click="card_submit" v-if="card_disabled == true">下一步</button>
        <button @click="card_submit" disabled="disabled" v-else>下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryPayInfo } from '../../config/services.js'
export default {
  name: 'index_pay',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
  },
  data() {
    return {
      //控制缴款码和身份证缴款
      leftOrRight: 'left',
      // 固定地址
      codeUrl: API.code,
      // 时间戳验证码地址
      codeUrlT: API.code,
      // 绑定缴款码
      payCode: '',
      // 绑定缴款码验证语言
      payCodeWarn: '',
      // 绑定缴款人
      payPeople: '',
      // 绑定缴款人验证语言
      payPeopleWarn: '',
      // 绑定验证码
      code: '',
      // 绑定缴款码验证语言
      codeWarn: '',
      //按钮失效
      disabled: true,
      //////////////////////////////////////////以上为缴款码缴款
      // 固定地址
      card_codeUrl: API.code,
      // 时间戳验证码地址
      card_codeUrlT: API.code,
      // 绑定缴款码
      card_payCode: '',
      // 绑定缴款码验证语言
      card_payCodeWarn: '',
      // 绑定缴款人
      card_payPeople: '',
      // 绑定缴款人验证语言
      card_payPeopleWarn: '',
      // 绑定验证码
      card_code: '',
      // 绑定缴款码验证语言
      card_codeWarn: '',
      //按钮失效
      card_disabled: true,
      ///////////////////////////////////////////以上为身份证号缴款
    }
  },
  methods: {
    //左右按钮
    leftButton() {
      this.leftOrRight = 'left'
    },
    rightButton() {
      this.leftOrRight = 'right'
    },
    // 改变验证码
    changeCode() {
      let timestamp = new Date().valueOf()
      this.codeUrlT = this.codeUrl.split('?')[0] + '?timestamp=' + timestamp
    },
    card_changeCode() {
      let timestamp = new Date().valueOf()
      this.card_codeUrlT = this.card_codeUrl.split('?')[0] + '?timestamp=' + timestamp
    },
    //提交下一步_缴款码
    submit() {
      let that = this
      this.warning()
      if (this.payCodeWarn == '' && this.payPeopleWarn == '' && this.codeWarn == '') {
        that.disabled = false
        queryPayInfo({
          payCode: this.payCode,
          payPeople: this.payPeople,
          code: this.code,
        }).then((res) => {
          res.code === 0 ? this.handleSuccess(res) : this.handleError(res)
        })
      } else {
      }
    },
    //提交下一步_身份证号
    card_submit() {
      let that = this
      this.card_warning()
      if (this.card_payCodeWarn == '' && this.card_payPeopleWarn == '' && this.card_codeWarn == '') {
        that.card_disabled = false
        queryPayInfo({
          card_payCode: this.card_payCode,
          card_payPeople: this.card_payPeople,
          card_code: this.card_code,
        }).then((res) => {
          res.code === 0 ? this.handleSuccess(res) : this.handleError(res)
        })
      } else {
      }
    },
    // 提交成功
    handleSuccess(data) {
      localStorage.setItem('data', JSON.stringify(data))
      this.$router.push({
        path: '/index_charge',
        name: 'index_charge',
      })
    },
    // 提交失败1
    handleError(err) {
      this.disabled = true
      this.card_disabled = true
      localStorage.removeItem('data')
      Dialog.alert({
        message: err.msg,
      }).then(() => {
        // on close
      })
    },
    //验证方法
    warning() {
      const regular = API.regular
      console.log(regular)
      this.payCode == ''
        ? (this.payCodeWarn = '请输入缴款码')
        : eval(regular).test(this.payCode)
        ? (this.payCodeWarn = '')
        : (this.payCodeWarn = API.regularText)
      this.payPeople == '' ? (this.payPeopleWarn = '请输入缴款人') : (this.payPeopleWarn = '')
      this.code == '' ? (this.codeWarn = '请输入验证码') : (this.codeWarn = '')
    },
    //验证方法2
    card_warning() {
      this.card_payCode == '' ? (this.card_payCodeWarn = '请输入身份证号') : (this.card_payCodeWarn = '')
      this.card_payPeople == '' ? (this.card_payPeopleWarn = '请输入缴款人') : (this.card_payPeopleWarn = '')
      this.card_code == '' ? (this.card_codeWarn = '请输入验证码') : (this.card_codeWarn = '')
    },
  },
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .top_box {
    span {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #848484;
    }
  }
  .top_box:nth-child(2) {
    margin-left: 20px;
  }
  .top_box_hover {
    border-bottom: 3px solid #fcecd2;
    span {
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000000;
      line-height: 36px;
      animation-name: leftAndRight;
      animation-duration: 0.3s;
    }
    @keyframes leftAndRight {
      from {
        font-size: 16px;
        border-bottom-color: white;
        font-weight: 300;
      }
      to {
        font-size: 19px;
        border-bottom-color: #fcecd2;
        font-weight: bold;
      }
    }
  }
  .un_top_box_hover {
    span {
      animation-name: unLeftAndRight;
      animation-duration: 0.3s;
    }
    @keyframes unLeftAndRight {
      from {
        font-size: 19px;
        border-bottom-color: #fcecd2;
        font-weight: bold;
      }
      to {
        font-size: 16px;
        border-bottom-color: white;
        font-weight: 300;
      }
    }
  }
}
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
  span {
    margin-left: 5%;
    vertical-align: -3px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }
}
.form_input {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  input {
    color: #333333;
    font-size: 16px;
    height: 35px;
    background-color: transparent;
    border: 0px solid #ddd;
    border-bottom: 1px solid #eeeef1;
    width: 90%;
  }
  input::-webkit-input-placeholder {
    color: #c3c3c4;
  }
  input:-moz-placeholder {
    color: #c3c3c4;
  }
  input:-ms-input-placeholder {
    color: #c3c3c4;
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
    color: #333333;
    font-size: 16px;
    height: 35px;
    background-color: transparent;
    border: 0px solid #ddd;
    border-bottom: 1px solid #eeeef1;
    width: 46%;
    margin-left: 5%;
  }
  input::-webkit-input-placeholder {
    color: #c3c3c4;
  }
  input:-moz-placeholder {
    color: #c3c3c4;
  }
  input:-ms-input-placeholder {
    color: #c3c3c4;
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
    height: 48px;
    background: #e7d2be;
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 16px;
  }
}
</style>
