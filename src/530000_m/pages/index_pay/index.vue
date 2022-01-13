<template>
  <div class="mainwrap">
    <div class="form">
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
        <button @click="submit" :style="type == 'wx' ? 'background-color:#55B76B' : null" v-if="disabled == true">
          下一步
        </button>
        <button @click="submit" :style="type == 'wx' ? 'background-color:#55B76B' : null" disabled="disabled" v-else>
          下一步
        </button>
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
    <customerService v-if="!isWxEnv"></customerService>
  </div>
</template>

<script>
import Privacy from '../components/privacy.vue'
import { Button, Row, Col, Search, Dialog, Overlay, Icon } from 'vant'
import API from '../../config/api.js'
import { queryPayInfo, code } from '../../config/services.js'
import CustomerService from '../components/customerService.vue'
export default {
  name: 'index_pay',
  components: {
    customerService: CustomerService,
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
      //type判断是否微信
      type: 'web',
      //uuid
      uuid: '',
      // 遮罩层元素
      show: false,
      isWxEnv: false,
    }
  },
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
        ? ((this.codeUrlT = 'data:image/gif;base64,' + res.data.img), (this.uuid = res.data.uuid))
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
    // 改变验证码
    changeCode() {
      var timestamp = new Date().valueOf()
      code({ timestamp: timestamp }).then((res) => {
        res.code === 0
          ? ((this.codeUrlT = 'data:image/gif;base64,' + res.data.img), (this.uuid = res.data.uuid))
          : this.handleError(res)
      })
    },
    //提交下一步
    submit() {
      let that = this
      this.warning()
      if (this.payCodeWarn == '' && this.payPeopleWarn == '' && this.codeWarn == '') {
        that.disabled = false
        queryPayInfo({
          payCode: this.payCode,
          payPeople: this.payPeople,
          code: this.code,
          uuid: this.uuid,
        }).then((res) => {
          res.code === 0 ? this.handleSuccess(res) : this.handleError(res)
        })
      }
    },
    // 提交成功

    handleSuccess(data) {
      localStorage.setItem('data', JSON.stringify(data))
      if (this.type == 'wx') {
        localStorage.setItem('type', 'wx')
      }
      this.$router.push({
        path: '/index_charge',
        name: 'index_charge',
      })
    },
    // 提交失败1
    handleError(err) {
      this.disabled = true
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
      this.payCode == ''
        ? (this.payCodeWarn = '请输入缴款码')
        : eval(regular).test(this.payCode)
        ? (this.payCodeWarn = '')
        : (this.payCodeWarn = API.regularText)
      this.payPeople == '' ? (this.payPeopleWarn = '请输入缴款人') : (this.payPeopleWarn = '')
      this.code == '' ? (this.codeWarn = '请输入验证码') : (this.codeWarn = '')
    },
  },
}
</script>

<style scoped lang="scss">
@mixin button-org {
  width: 94%;
  height: 48px;
  background: #5380e1;
  border-radius: 4px;
  border: 0px;
  color: white;
  font-size: 16px;
}
@mixin color-input {
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
.form {
  width: 100%;
  height: 100px;
  padding-top: 20px;
}
.form_box {
  width: 100%;
  height: 100px;
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
  @include color-input;
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
  @include color-input;
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
    @include button-org;
  }
}
.footerc {
  font-size: 14px;
  color: #999ea0;
  text-align: center;
  // height:0.92rem;
}
.footerc {
  font-size: 14px;
  color: #999ea0;
  text-align: center;
  // height:0.92rem;
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
