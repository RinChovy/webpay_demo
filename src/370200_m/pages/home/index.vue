<template>
  <div class="mainwrap">
    <div class="headern">
      <img class="middle" @click="indexPay" src="../../public/images/phone_box.png" alt="" />

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
      bottom_span: '主办单位：青岛市财政局',
      bottom_span2: '服务电话：0532-85856831',
      bottom_span3: '服务时间：法定工作日，09:00-17:00',
    }
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: '/index_pay',
      })
    },
    indexUrl() {
      window.location.href = 'http://120.221.95.25/nonapp/nontaxapp/homepage.html'
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
  padding-top: 52%;
}
.middle {
  width: 100%;
  margin: -44px auto 0;
  // height: 200px;
  // background: white;
  // margin: 0 auto 0;
  // border-radius: 20px;
  // box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  // display: flex;
  // justify-content: space-around;
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
  margin-top: 20px;
  text-align: center;
  div {
    height: 30px;
    display: flex;
  }
  img {
    width: 90px;
  }
  span {
    width: 100%;
    vertical-align: top;
    font-size: 12px;
  }
}

.bottom_span {
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #999ea0;
}
</style>
