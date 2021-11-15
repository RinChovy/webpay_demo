<template>
  <div class="mainwrap">
    <div class="headern">
      <div>
        <van-search
          style="opacity: 0.8;"
          shape="round"
          background="transparent"
          placeholder="查找服务"
        />
      </div>
      <div class="middle">
        <div class="middle_box">
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/feisui.png" alt="" />
            <div><span>一般非税缴款</span></div>
          </div>
          <div class="box" @click="indexUrl">
            <img src="../../public/images/icon/jiaoyu.png" alt="" />
            <div><span>缴款记录</span></div>
          </div>
          <div class="box" @click="index_url">
            <img src="../../public/images/icon/caizheng.png" alt="" />
            <div><span>财政票据查验</span></div>
          </div>
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/ping.png" alt="" />
            <div><span>缴款状态查询</span></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_span">
          <span>推荐服务</span>
        </div>
        <div class="footer_box">
          <img src="../../public/images/phone_box_bottom.png" alt="" />
        </div>
      </div>
      <div class="bottom_span">
        <span>{{ bottom_span }}<br />{{ bottom_span2 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from 'vant';
import API from '../../config/api.js';
import { getAliUserId, getOpenPlatformUserid } from '../../config/services.js';
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
      bottom_span: '主办单位：贵州省财政厅',
      // bottom_span2: '服务电话：0532-85856831',
      // bottom_span3: '服务时间：法定工作日，09:00-17:00',
    };
  },
  mounted() {
    const user_id = localStorage.getItem('userId');
    let appId = localStorage.getItem('appId');
    if (!user_id || appId !== '2021002148681851') {
      ap &&
        ap.getAuthCode(
          {
            appId: '2021002148681851',
            scopes: ['auth_base'],
          },
          function (res) {
            console.log(res, 'res');
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
                    localStorage.setItem('appId', '2021002148681851');
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
        name: 'index_pay',
      });
    },
    indexUrl() {
      this.$router.push({
        path: '/order_record',
      });
    },
    index_url() {
      window.location.href = 'http://fs.guizhou.gov.cn/billcheck';
    },
  },
};
</script>

<style scoped lang="scss">
.headern {
  width: 100%;
  background: url('../../public/images/phone_background.png') no-repeat;
  background-size: 100%;
  height: 640px;
}
.middle {
  width: 100%;
  // height: 236px;
  margin-top: 120px;
  .middle_box {
    width: 94%;
    background: white;
    height: 254px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 0px rgba(30, 161, 253, 0.2);
    display: flex;
    flex-wrap: wrap;
    .box:first-child {
      border-right: 1px solid #f2f3f5;
      border-bottom: 1px solid #f2f3f5;
    }
    .box:nth-child(2) {
      border-bottom: 1px solid #f2f3f5;
    }
    .box:nth-child(3) {
      border-right: 1px solid #f2f3f5;
    }
    .box {
      text-align: center;
      width: 50%;
      height: 128px;
      div {
        margin-top: 10px;
      }
      img {
        margin-top: 15px;
        width: 62px;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #464a4c;
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
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #999ea0;
}
</style>
