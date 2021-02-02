<template>
  <div class="mainwrap">
    <div class="headern">
      <div>
        <van-search
          style="opacity: 0.8"
          shape="round"
          background="transparent"
          placeholder="查找服务"
        />
      </div>
      <div class="middle">
        <div class="img" @click="indexPay"></div>
      </div>
      <div class="footer">
        <div class="footer_span">
          <span>推荐服务</span>
        </div>
        <div class="footer_box">
          <img src="../../public/images/phone_box_bottom.png" />
        </div>
      </div>
      <div class="bottom_span">
        <span>{{ bottom_span }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from "vant";
export default {
  name: "home",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
  },
  data() {
    return {
      value:"value",
      good: "value",
      bottom_span: "主办单位：鹤岗市财政局",
    };
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: "/index_pay",
        name: "index_pay",
       });
    },
  },
};
</script>

<style scoped lang="scss">
.headern {
  width: 100%;
  background: url("../../public/images/phone_background.png") no-repeat;
  background-size: cover;
  height: 640px;
}
.middle {
  width: 100%;
  height: 200px;
  background: transparent;
  margin-top: 126px;
}
.img {
  background: url("../../public/images/phone_box.png") no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  width: 374px;
  height: 192px;
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
  background: url("../../public/images/span_background.png") no-repeat center bottom;
  background-size: 100%;
}
.footer_box {
  text-align: center;
  padding-top: 20px;
}
.footer_box img {
  width: 96%;
}
.bottom_span {
  margin-top: 20px;
  font-size: 12px;
  text-align: center;
  color: #999ea0;
}
</style>
