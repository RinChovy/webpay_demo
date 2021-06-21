<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img alt="" src="../../public/images/paycode.png" />
          <span>处罚决定书编号</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入处罚决定书编号" v-model="payCode" />
        </div>
        <div class="form_input_warn">
          <span>{{ payCodeWarn }}</span>
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
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryPayInfo , getOpenid , getOpenPlatformUserid,queryPenaltyDecisionInfo,getCode } from '../../config/services.js'
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
      // 固定地址
      codeUrl: API.code,
      // 时间戳验证码地址
      codeUrlT: API.code,
      // 绑定缴款码
      payCode: '',
      // 绑定缴款码验证语言
      payCodeWarn: '',

      // 绑定验证码
      code: '',
      // 绑定缴款码验证语言
      codeWarn: '',
      //按钮失效
      disabled: true,
    }
  },
  created(){
    this.changeCode()
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
      // let timestamp = new Date().valueOf()
      // this.codeUrlT = this.codeUrl.split('?')[0] + '?timestamp=' + timestamp
      getCode({}).then((res)=>{
       if (res.code === 0) {
          this.codeUrlT = 'data:image/gif;base64,' + res.data.img
          this.uuid = res.data.uuid
        }
      })
    },
    //提交下一步
    submit() {
      let that = this
      this.warning()
      if (this.payCodeWarn == '' && this.codeWarn == '') {
        that.disabled = false
        queryPenaltyDecisionInfo({
          // payCode: this.payCode,
          // code: this.code,
          headers: {
              codeUId: this.uuid
          },
          data:{
              payCode: this.payCode,
              code: this.code,
          }
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
        ? (this.payCodeWarn = '请输入处罚决定书编号')
        : eval(regular).test(this.payCode)
        ? (this.payCodeWarn = '')
        : (this.payCodeWarn = API.regularText)
      this.code == '' ? (this.codeWarn = '请输入验证码') : (this.codeWarn = '')
    },
  },
}
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
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #4690ff), color-stop(100%, #556ffe));
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 19px;
  }
}
</style>
