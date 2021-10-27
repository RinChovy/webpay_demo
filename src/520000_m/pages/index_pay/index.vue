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
        <button @click="submit" v-if="disabled == true">下一步</button>
        <button @click="submit" disabled="disabled" v-else>下一步</button>
      </div>
       <div style="margin-top: 20px; text-align: center;">
        <span>
          阅读并接受<span style="color: rgb(24, 144, 255);" @click="show = true"
            >《用户隐私声明》</span
          >
        </span>
      </div>
    </div>
     <van-overlay :show="show" @click="show = false">
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
import Privacy from '../components/privacy.vue';
import { Button, Row, Col, Search, Dialog , Overlay, Icon} from 'vant'
import API from '../../config/api.js'
import { queryPayInfo , getOpenid , getOpenPlatformUserid,getCode} from '../../config/services.js'
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
      uuid:'',
         // 遮罩层元素
      show: false,
    }
  },
  created(){
    this.changeCode()
  },
    mounted() {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
      // 否则就是在微信中 引入微信js
      // document.writeln('<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"' + '>' + '<' + '/' + 'script>');
      // util.loadScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js");
      //  处理微信小程序内 webview 页面监听状态的方法
      const openid = localStorage.getItem('openid')
      if (openid) {
        getOpenPlatformUserid({
          openid: openid,
        }).then((resData) => {
          if (resData.code === 0) {
            localStorage.removeItem('userId')
            localStorage.setItem('userId', resData.data.user_id)
          } else {
            Dialog.alert({
              message: resData.msg,
            }).then(() => {
              // on close
            })
          }
        })
      } else {
        var url = location.href.split('#')[0]
        let state = this.GetQueryValue('state')
        console.log('url' + url)
        console.log('state' + state)
        if (typeof state != 'undefined' && '' != typeof state) {
          if (state == 'cityService') {
            // 验证是城市服务
            // 获取code
            let code = this.GetQueryValue('code')
            console.log('code' + code)
            getOpenid({
              code: code,
            }).then((data) => {
              if (data.code === 0) {
                localStorage.removeItem('openid')
                localStorage.setItem('openid', data.data.openid)
                getOpenPlatformUserid({
                  openid: data.data.openid,
                }).then((resData) => {
                  if (resData.code === 0) {
                    localStorage.removeItem('userId')
                    localStorage.setItem('userId', resData.data.user_id)
                  } else {
                    Dialog.alert({
                      message: resData.msg,
                    }).then(() => {
                      // on close
                    })
                  }
                })
              } else {
                Dialog.alert({
                  message: data.msg,
                }).then(() => {
                  // on close
                })
              }
            })
          }
        }
      }
    }
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
      if (this.payCodeWarn == '' && this.payPeopleWarn == '' && this.codeWarn == '') {
        that.disabled = false
        queryPayInfo({
          headers: {
            codeUId: this.uuid
          },
          data:{
              payCode: this.payCode,
              payPeople: this.payPeople,
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
    background: #57B8BD;
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
