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
        <div class="middle_box">
          <div class="box" @click="indexPay">
            <img src="../../public/images/icon/feisui.png" alt="" />
            <div><span>非税缴款</span></div>
          </div>
          <div class="box" @click="indexPayTraffic">
            <img src="../../public/images/icon/gongan.png" alt="" />
            <div><span>交罚缴款</span></div>
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
      value: "value",
      good: "value",
      bottom_span: "主办单位：贵州省财政厅",
      bottom_span2: "",
    };
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: "/index_pay",
      });
    },
    indexPayTraffic() {
      this.$router.push({
        path: "/index_pay_traffic",
      });
    },
    index_url() {
      window.location.href = "http://fs.guizhou.gov.cn/billcheck";
    },
  },
};
</script>

<style scoped lang="scss">
.headern {
  width: 100%;
  background: url("../../public/images/phone_background.png") no-repeat;
  background-size: 100%;
  height: 640px;
}
.middle {
  margin-top: 152px;
  width: 100%;
  height: 240px;
  .middle_box {
    width: 94%;
    background: white;
    height: 240px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: rgba(230, 242, 248, 0.5) 0px 0px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    .box {
      text-align: center;
      flex: 1;
      min-width: 50%;
      height: 120px;
      img {
        width: 72px;
        margin-top: 3px;
      }
    }
  }
}
.img {
  background: url("../../public/images/phone_box.png") no-repeat center;
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
  background: url("../../public/images/span_background.png") no-repeat center
    bottom;
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
