<template>
  <div class="mainwrap">
    <div class="headern">
      <div class="middle">
        <div class="box" @click="indexPay">
          <img src="../../public/images/feisui.png" alt="" />
          <div>
            <span>非税缴款</span>
          </div>
        </div>
        <div class="box" @click="indexUrl">
          <img src="../../public/images/jiaoyu.png" alt="" />
          <div>
            <span>缴款记录</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_span">
          <span>推荐服务</span>
        </div>
        <div class="footer_box">
          <img @click="indexPay" src="../../public/images/phone_box_bottom.png" alt="" />
        </div>
      </div>
      <div class="bottom_span">
        <span>{{ bottom_span }}</span
        ><br />
        <span>{{ bottom_span2 }}</span
        ><br />
        <span>{{ bottom_span3 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant'
import API from '../../config/api.js'
import { getAliUserId, getOpenPlatformUserid } from '../../config/services.js'
export default {
  name: 'home',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
  },
  data() {
    return {
      value: 'value',
      good: 'value',
      bottom_span: '主办单位：青岛市财政局',
      bottom_span2: '服务电话：0532-85856831',
      bottom_span3: '服务时间：法定工作日，09:00-17:00',
    }
  },
  mounted() {
    const user_id = localStorage.getItem('userId')
    if (!user_id) {
      ap &&
        ap.getAuthCode(
          {
            appId: '2019090566921553',
            scopes: ['auth_base'],
          },
          function (res) {
            getAliUserId({
              authCode: res.authCode,
            }).then((data) => {
              if (data.code === 0) {
                getOpenPlatformUserid({
                  aliUserId: data.data.aliUserId,
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
        )
    }
  },
  methods: {
    indexPay() {
      this.$router.push({
        // path: "/index_pay",
        name: 'index_pay',
      })
    },
    indexUrl() {
      this.$router.push({
        path: '/order_record',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.headern {
  width: 100%;
  background: url('../../public/images/phone_background.png') no-repeat;
  background-size: 100%;
  height: 640px;
  padding-top: 44%;
}
.middle {
  width: 90%;
  height: 134px;
  background: white;
  margin: 0 auto 0;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(146, 146, 146, 0.18);
  display: flex;
  justify-content: space-around;
}
.img {
  background: url('../../public/images/phone_box.png') no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.footer {
  width: 100%;
}
.footer_span {
  margin-top: 20px;
  margin-left: 20px;
  width: 75px;
  font-size: 17px;
  font-weight: bold;
  color: #464a4c;
  background: url('../../public/images/span_background.png') no-repeat center bottom;
  background-size: 100%;
}
.footer_box {
  text-align: center;
  padding-top: 20px;
  img {
    width: 96%;
  }
}
.box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  div {
    height: 30px;
    display: flex;
  }
  img {
    width: 68px;
  }
  span {
    width: 100%;
    vertical-align: top;
    font-size: 12px;
  }
}
.box:first-child {
  border-right: 1px solid #f1f1f1;
}

.bottom_span {
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #999ea0;
}
</style>
