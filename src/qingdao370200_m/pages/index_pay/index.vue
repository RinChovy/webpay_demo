<template>
  <div class="mainwrap">
    <div class="form">
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/paycode.png">
          <span>缴款码</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入缴款码"/>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/payname.png">
          <span>缴款人</span>
        </div>
        <div class="form_input">
          <input placeholder="请输入缴款人"/>
        </div>
      </div>
      <div class="form_box">
        <div class="form_label">
          <img src="../../public/images/code.png">
          <span>验证码</span>
        </div>
        <div class="form_input_code">
          <input placeholder="请输入验证码"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search } from "vant";
export default {
  name: "index_pay",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
  },
  data() {
    return {
      good: "value",
      bottom_span: "主办单位：鹤岗市财政局",
    };
  },
  methods: {},
};
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
.form_label img{
  margin-left: 4%;
   width: 25px;
}
.form_label span{
  margin-left: 5px;
  vertical-align: 5px;
  font-size: 18px;
  font-weight: bold;
}
.form_input{
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.form_input input{
    color: #999EA0;
    font-size: 17px;
    padding-left: 10px;
    height: 35px;
    background-color: #F4F4F4;
    border: 0px solid #ddd;
    width: 90%;
    border-radius: 4px;
}
.form_input_code{
   margin-top: 10px;
   width: 100%;
}
.form_input_code input{
   color: #999EA0;
    font-size: 17px;
    padding-left: 10px;
    height: 35px;
    background-color: #F4F4F4;
    border: 0px solid #ddd;
    width: 50%;
    margin-left: 4%;
    border-radius: 4px;
}
</style>
