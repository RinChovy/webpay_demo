<template>
  <div class="mainwrap">
    <div class="headern">
      <div>
        <van-search style="opacity: 0.8" shape="round" background="transparent" placeholder="查找服务" />
      </div>
      <div class="middle">
        <div class="middle_box">
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/feisui.png" alt="" />
            <div><span>一般非税缴款</span></div>
          </div>
          <div class="box" @click="indexPayEducation">
            <img src="../../public/images/icon/jiaoyu.png" alt="" />
            <div><span>教育缴费</span></div>
          </div>
          <div class="box" @click="indexUrl">
            <img src="../../public/images/icon/caizheng.png" alt="" />
            <div><span>财政票据查询</span></div>
          </div>
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/ping.png" alt="" />
            <div><span>缴款凭证查询</span></div>
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
        <img src="../../public/images/bosssoft_logo.png" alt="" />
        <span>{{ bottom_span }}<br /></span>
        <!-- <span>{{ bottom_span2 }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from 'vant'
export default {
  name: 'home',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
  },
  data() {
    return {
      value: 'value',
      good: 'value',
      bottom_span: '博思致新为您提供缴费支持',
      bottom_span2: '客服电话：010-0001001',
    }
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: '/index_pay',
      })
    },
    indexPayEducation() {
      this.$router.push({
        path: '/education',
      })
    },
    indexUrl() {
      window.location.href = 'http://pjcy.mof.gov.cn/#/home'
    },
  },
}
</script>

<style scoped lang="scss">
.headern {
  width: 100%;
  background: url('../../public/images/phone_new/phone_background.png') no-repeat;
  background-size: 100%;
  height: 640px;
}
.middle {
  width: 100%;
  height: 236px;
  margin-top: 142px;
  .middle_box {
    width: 94%;
    background: white;
    height: 236px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 0px rgba(146, 146, 146, 0.18);
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
      height: 118px;
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
  width: 78px;
  font-size: 19px;
  font-weight: bold;
  color: #464a4c;
  background: url('../../public/images/span_background.png') no-repeat center bottom;
  background-size: 100%;
}
.footer_box {
  text-align: center;
  padding-top: 20px;
  img {
    width: 100%;
  }
}

.bottom_span {
  margin: 20px auto;
  width: 92%;
  font-size: 12px;
  text-align: center;
  color: #999ea0;
  // display: flex;
  // justify-content: center;
  img {
    width: 16px;
  }
  span {
    margin-left: 5px;
    vertical-align: bottom;
  }
}
</style>
