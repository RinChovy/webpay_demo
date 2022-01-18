<template>
  <div class="mainwrap">
    <div class="top" v-show="false">
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
          <input placeholder="请输入缴款人" v-model="payPeople" maxlength="20" />
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
      <div style="margin-top: 20px; text-align: center">
        <span> 阅读并接受<span style="color: rgb(24, 144, 255)" @click="show = true">《用户隐私声明》</span> </span>
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
          <input placeholder="请输入缴款人" v-model="card_payPeople" maxlength="20" />
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
      <div style="margin-top: 20px; text-align: center">
        <span> 阅读并接受<span style="color: rgb(24, 144, 255)" @click="show = true">《用户隐私声明》</span> </span>
      </div>
    </div>

    <van-overlay :show="show" @click="show = false" :lock-scroll="false">
      <div class="wrapper">
        <div class="wrapper_model">
          <div class="icon">
            <van-icon name="cross" size="30" @click="show = false" />
          </div>
          <privacy></privacy>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Privacy from '../components/privacy.vue'
import { Button, Row, Col, Search, Dialog, Overlay, Icon } from 'vant'
import API from '../../config/api.js'
import { queryPayInfo, queryPayInfoByIdentityCard, code } from '../../config/services.js'
export default {
  name: 'index_pay',
  components: {
    privacy: Privacy,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
    'van-overlay': Overlay,
    'van-icon': Icon,
  },
  data() {
    return {
      //控制缴款码和身份证缴款
      leftOrRight: 'right',
      // 固定地址
      codeUrl: API.code,
      // 时间戳验证码地址
      codeUrlT: '',
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
      card_codeUrlT: '',
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
      //uuid
      uuid: '',
      //uuid
      card_uuid: '',
      ///////////////////////////////////////////以上为身份证号缴款
      // 遮罩层元素
      show: false,
    }
  },
  //初始生命周期
  created() {
    let that = this
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          // 微信小程序
          that.isWxEnv = true
          const url = location.href
          if (url.indexOf('openid=') != -1) {
            const openid = that.GetQueryValue('openid')
            if (openid != '' && openid != null) {
              localStorage.removeItem('openid')
              localStorage.setItem('openid', openid)
            }
          }
          if (url.indexOf('userId=') != -1) {
            const userId = that.GetQueryValue('userId')
            if (userId != '' && userId != null) {
              localStorage.removeItem('userId')
              localStorage.setItem('userId', userId)
            }
          }
        } else {
          //微信环境
        }
      })
    }

    code().then((res) => {
      res.code === 0
        ? ((this.codeUrlT = 'data:image/gif;base64,' + res.data.img),
          (this.card_codeUrlT = 'data:image/gif;base64,' + res.data.img),
          (this.uuid = res.data.uuid),
          (this.card_uuid = res.data.uuid))
        : this.handleError(res)
    })
  },
  methods: {
    GetQueryValue(queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return ''
      }
    },
    //左右按钮
    leftButton() {
      this.leftOrRight = 'left'
    },
    rightButton() {
      this.leftOrRight = 'right'
    },
    // 改变验证码
    changeCode() {
      var timestamp = new Date().valueOf()
      code({ timestamp: timestamp }).then((res) => {
        res.code === 0
          ? ((this.codeUrlT = 'data:image/gif;base64,' + res.data.img), (this.uuid = res.data.uuid))
          : this.handleError(res)
      })
    },
    card_changeCode() {
      var timestamp = new Date().valueOf()
      code({ timestamp: timestamp }).then((res) => {
        res.code === 0
          ? ((this.card_codeUrlT = 'data:image/gif;base64,' + res.data.img), (this.card_uuid = res.data.uuid))
          : this.handleError(res)
      })
    },
    //提交下一步_缴款码
    submit() {
      let that = this
      this.warning()
      if (this.payCodeWarn == '' && this.payPeopleWarn == '' && this.codeWarn == '') {
        that.disabled = false
        queryPayInfo({
          payCode: this.payCode,
          payPeople: this.payPeople.trim(),
          code: this.code.trim(),
          uuid: this.uuid,
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
        queryPayInfoByIdentityCard({
          idNumber: this.card_payCode,
          payPeople: this.card_payPeople.trim(),
          code: this.card_code.trim(),
          uuid: this.card_uuid,
        }).then((res) => {
          res.code === 0 ? this.handleSuccess2(res) : this.handleError(res)
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
    // 提交成功
    handleSuccess2(data) {
      localStorage.setItem('dataList', JSON.stringify(data))
      this.$router.push({
        path: '/index_pay_idcard',
        name: 'index_pay_idcard',
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
      this.payCode = this.payCode.trim()
      const regular = API.regular
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
      this.card_payCode = this.card_payCode.trim()

      let reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/

      this.card_payCode == ''
        ? (this.card_payCodeWarn = '请输入身份证号')
        : eval(reg).test(this.card_payCode)
        ? (this.card_payCodeWarn = '')
        : (this.card_payCodeWarn = '身份证格式不正确')

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
    background: #5380e1;
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 16px;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.wrapper_model {
  position: relative;
  width: 90%;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
}
.icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
}
</style>
