<template>
  <div class="mainwrap">
    <div class="headern">
      <div class="middle">
        <div class="middle_box">
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/feisui.png" alt="" />
            <div><span>一般非税缴款</span></div>
          </div>
          <div class="box" @click="evURL">
            <img src="../../public/images/icon/ping.png" alt="" />
            <div><span>财政票据查验</span></div>
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
    <customerService></customerService>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from 'vant';
import CustomerService from '../components/customerService.vue';
export default {
  name: 'home',
  components: {
    customerService: CustomerService,
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
  },
  data() {
    return {
      value: 'value',
      good: 'value',
      bottom_span: '北京博思致新科技有限公司为您提供缴费支持',
      bottom_span2: '',
    };
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: '/index_pay',
      });
    },
    evURL() {
      window.location.href = 'http://220.182.49.217:18686/billcheck/#/home';
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
  height: 285px;
  padding-top: 150px;
  .middle_box {
    width: 94%;
    background: white;
    height: 118px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 0px rgba(146, 146, 146, 0.18);
    display: flex;
    flex-wrap: wrap;
    .box:first-child {
      border-right: 1px solid #f2f3f5;
    }
    // .box:nth-child(2) {
    //   border-bottom: 1px solid #f2f3f5;
    // }
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
