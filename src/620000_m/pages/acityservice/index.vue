<template>
  <div class="mainwrap">
    <div class="headern">
      <div></div>
      <div class="middle">
        <div class="middle_box">
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/feisui.png" alt="" />
            <div><span>非税缴款</span></div>
          </div>
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/jiaoyu.png" alt="" />
            <div><span>教育缴款</span></div>
          </div>
          <div class="box" @click="policy">
            <img src="../../public/images/icon/qupiao.png" alt="" />
            <div><span>政策依据查询</span></div>
          </div>
          <div class="box" @click="indexPayEn">
            <img src="../../public/images/icon/ping.png" alt="" />
            <div><span>票据查询打印</span></div>
          </div>
          <div class="box" @click="indexUrl">
            <img src="../../public/images/icon/jilu.png" alt="" />
            <div><span>缴款记录</span></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="bottom_span">
          <div>
            <img src="../../public/images/icon/danwei.png" alt="" />
            <span>{{ bottom_span }}</span>
          </div>
          <div>
            <img src="../../public/images/icon/phone.png" alt="" />
            <span>{{ bottom_span2 }}&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
    <img class="bottom" src="../../public/images/background_bottom.png" alt="" />
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant';
import { getAliUserId, getOpenPlatformUserid, notice } from '../../config/services.js';
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
      bottom_span: '主办单位：甘肃省财政厅',
      bottom_span2: '客服电话：4008885699',
    };
  },
  created() {
    //进来提示
    notice().then((res) => {
      res.code === 0 &&
        res.data.status == '1' &&
        Dialog.alert({
          message: res.data.noticeInfo,
        }).then(() => {});
    });
  },
  mounted() {
    const user_id = localStorage.getItem('userId');
    let appId = localStorage.getItem('appId');
    if (!user_id || appId !== '2021002150607946') {
      ap &&
        ap.getAuthCode(
          {
            appId: '2021002150607946',
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
                    localStorage.removeItem('userId');
                    localStorage.setItem('userId', resData.data.user_id);
                    localStorage.removeItem('appId');
                    localStorage.setItem('appId', '2021002150607946');
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
        );
    }
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: '/index_pay',
      });
    },
    policy() {
      localStorage.removeItem('sessionPage');
      localStorage.removeItem('sessionItemName');
      this.$router.push({
        path: '/policy',
      });
    },
    indexUrl() {
      this.$router.push({
        path: '/order_record',
      });
    },
    indexPayEn() {
      this.$router.push({
        path: '/index_payEn',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.mainwrap {
  width: 100%;
  background: url('../../public/images/background_top.png');
  background-repeat: no-repeat;
  background-color: #066ef7;
  background-size: 100%;
  // background: #066ef7;
  position: fixed;
}
.headern {
  width: 100%;
  height: 670px;
  padding-top: 50%;
}
.middle {
  width: 100%;
  height: 250px;
  .middle_box {
    width: 94%;
    background: white;
    height: 250px;
    margin: 0 auto;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    // box-shadow: 0 4px 18px 0 rgb(0, 0, 0 / 8%);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.13);
    .box {
      text-align: center;
      width: 33%;
      img {
        margin-top: 10px;
        width: 78px;
      }
    }
  }
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

.bottom_span {
  margin: 20px auto;
  width: 92%;
  font-size: 12px;
  // text-align: center;
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    margin: 2px auto;
    overflow-x: auto;
  }
  img {
    width: 16px;
  }
  span {
    vertical-align: middle;
  }
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: -1;
}
</style>
