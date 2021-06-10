<template>
  <div class="mainwrap">
    <div class="div_img">
      <img src="../../public/images/phone/fail.png" alt="" />
      <div style="margin-top: 10px">
        <span>缴款失败</span>
      </div>
    </div>
    <div class="div_button">
      <button @click="home">返回首页</button>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from "vant";
export default {
  name: "success",
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
    };
  },
  methods: {
    home() {
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.div_img {
  width: 100%;
  text-align: center;
  img {
    margin-top: 56%;
  }
  span {
    font-size: 16px;
    color: #464a4c;
    font-weight: bold;
    margin-top: 20px;
  }
}
.div_button {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  button {
    width: 140px;
    height: 40px;
    border: 1px solid #4690ff;
    font-size: 17px;
    color: #4690ff;
    border-radius: 3px;
    background-color: white;
  }
}
</style>
