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
        <div class="box" @click="indexPay">
          <img src="../../public/images/feisui.png" alt="" />
          <div>
            <span>非税缴款</span>
          </div>
        </div>
        <div class="box" @click="indexUrl">
          <img src="../../public/images/jiaoyu.png" alt="" />
          <div>
            <span>缴款记录</span>
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
import { Button, Row, Col, Search, Dialog } from "vant";
import API from "../../config/api.js";
import { getAliUserId, getOpenPlatformUserid } from "../../config/services.js";
export default {
  name: "home",
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button,
    "van-search": Search,
    "van-dialog": Dialog,
  },
  data() {
    return {
      value: "value",
      good: "value",
      bottom_span: "主办单位：青岛市财政局",
      bottom_span2: "服务电话：0532-58623183",
      bottom_span3: "服务时间：法定工作日，09:00-17:00",
    };
  },
  mounted() {},
  methods: {
    indexPay() {
      ap.getAuthCode(
        {
          appId: "2019090566921553",
          scopes: ["auth_base"],
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
                  localStorage.removeItem("userId");
                  localStorage.setItem("userId", resData.data.user_id);
                  this.$router.push({
                    path: "/index_pay",
                    params: resData,
                  });
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
    },
    indexUrl() {
      // getOpenPlatformUserid({
      //   aliUserId: 2088102241065681,
      // }).then((resData) => {
      //   if (resData.code === 0) {
      //     localStorage.removeItem("userId");
      //     localStorage.setItem("userId", resData.data.user_id);
      //     this.$router.push({
      //       path: "/order_record",
      //       params: resData,
      //     });
      //   } else {
      //     Dialog.alert({
      //       message: resData.msg,
      //     }).then(() => {
      //       // on close
      //     });
      //   }
      // });
      ap.getAuthCode(
        {
          appId: "2019090566921553",
          scopes: ["auth_base"],
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
                  localStorage.removeItem("userId");
                  localStorage.setItem("userId", resData.data.user_id);
                  alert("存储userid==" + resData.data.user_id);
                  this.$router.push({
                    path: "/order_record",
                    params: resData,
                  });
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
  width: 90%;
  height: 200px;
  background: white;
  margin: 126px auto 0;
  border-radius: 20px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-around;
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
