<template>
  <div class="mainwrap">
    <div class="div_img">
      <img src="../../public/images/phone/success.png" alt="" />
      <div style="margin-top: 10px">
        <span>缴款成功</span>
      </div>
    </div>
    <div class="div_button" v-if="url != null">
      <button @click="einvoice_url">查看电子票</button>
    </div>
    <div class="div_button" else>
      <button @click="home">返回首页</button>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Search, Dialog } from "vant";
import { success } from "../../config/services.js";
export default {
  name: "success",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
    "van-dialog": Dialog,
  },
  data() {
    return {
      merchant_order_no: "",
      spanPay: "缴款成功",
      url: "", //电子票地址
    };
  },
  //加载生命周期
  created() {
    const url = location.hash;
    console.log("url为" + url);
    const rsa = url.substring(url.indexOf("=") + 1);
    console.log("rsa为" + rsa);
    success({
      rsa: rsa,
    }).then((res) => {
      if (res.code === 0) {
        console.log(res);
        (this.url = res.data.einvoice_url),
          (this.merchant_order_no = res.data.merchant_order_no);
      } else {
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          // on close
        });
      }
    });
  },
  methods: {
    indexPay() {
      this.$router.push({
        path: "/index_pay",
      });
    },
    einvoice_url() {
      window.location.href = this.url;
    },
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
