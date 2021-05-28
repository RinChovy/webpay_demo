<template>
  <div>
    <van-dropdown-menu active-color="#4690FF">
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        :lazy-render="false"
        get-container="body"
        @change="change"
      />
      <!-- 挂载点 -->
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        get-container="body"
        @change="change2"
      />
    </van-dropdown-menu>
    <div>
      <div v-for="(k, index) in model" class="box" :key="index">
        <div @click="details" :data-item="JSON.stringify(k)">
          <div class="box_nei">
            <div class="top">
              <span class="left"
                ><span
                  class="left_two_ts"
                  v-for="(m, n) in JSON.parse(k.item_name_set)"
                  :key="n"
                >
                  <span>{{ JSON.parse(k.item_name_set)[0].itemName }}...</span>
                </span></span
              >

              <span class="left_two" style="color: #333333; font-weight: 600"
                >￥{{ k.fmat }}</span
              >
            </div>
          </div>
          <div class="box_nei">
            <div class="top">
              <span class="left">{{ k.create_time }}</span>
              <span
                class="left_two"
                style="color: #00d414"
                v-if="
                  k.order_status == '1' ||
                  k.order_status == '2' ||
                  k.order_status == '3' ||
                  k.order_status == '4'
                "
                >已缴款</span
              >
              <span
                class="left_two"
                style="color: #00d414"
                v-else-if="k.order_status == '5' || k.order_status == '6'"
                ||
                >已缴款</span
              >
              <span class="left_two" style="color: red" v-else>处理中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Dialog } from "vant";
import API from "../../config/api.js";
import {
  queryOrderRecord,
  getOpenid,
  getOpenPlatformUserid,
} from "../../config/services.js";

export default {
  //   name: "wx_charge",
  components: {
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-dialog": Dialog,
  },
  data() {
    return {
      model: [], //数据状态
      title1: "缴款状态", //缴款状态title
      title2: "缴款年份", //缴款年份title
      titleValue1: "0,1,-1,2,3,4,5,6", //缴款状态value
      titleValue2: "9999", //缴款年份value
      value1: "0,1,-1,2,3,4,5,6",
      value2: "9999",
      option1: [
        { text: "全部状态", value: "0,1,-1,2,3,4,5,6" },
        { text: "缴款成功", value: "1,2,3,4" },
        { text: "处理中", value: "0,-1" },
        { text: "退款", value: "5,6" },
      ],
      option2: [
        { text: "全部年份", value: "9999" },
        { text: "2020", value: "2020" },
        { text: "2021", value: "2021" },
        { text: "2022", value: "2022" },
      ],
    };
  },
  mounted() {
    //加载完成执行
    var userId = localStorage.getItem("userId");
    if (userId) {
    } else {
      if (navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1) {
        // 否则就是在微信中 引入微信js
        // document.writeln('<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"' + '>' + '<' + '/' + 'script>');
        // util.loadScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js");
        //  处理微信小程序内 webview 页面监听状态的方法
        var url = location.href.split("#")[0];
        let state = this.GetQueryValue("state");
        console.log("url" + url);
        console.log("start" + state);
        if (typeof state != "undefined" && "" != typeof state) {
          if (state == "cityService") {
            // 验证是城市服务
            // 获取code
            let code = this.GetQueryValue("code");
            console.log("code" + code);
            getOpenid({
              code: code,
            }).then((data) => {
              if (data.code === 0) {
                getOpenPlatformUserid({
                  openid: data.data.openid,
                }).then((resData) => {
                  if (resData.code === 0) {
                    localStorage.removeItem("userId");
                    localStorage.setItem("userId", resData.data.user_id);
                    userId = resData.data.user_id;
                  } else {
                    Dialog.alert({
                      message: data.msg,
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
        }
      }
    }
    queryOrderRecord({
      date_end: "20300101",
      date_start: "20200101",
      order_status: "0,1,-1,2,3,4,5,6",
      page_number: 1,
      page_size: "999",
      user_id: userId,
      // user_id: "fb1457e5680e1c80a97076976fae0764",
    }).then((data) => {
      if (data.code === 0) {
        let a = JSON.parse(data.data.orderInfos);
        this.model = a.details;
      } else {
        Dialog.alert({
          message: data.msg,
        }).then(() => {
          // on close
        });
      }
    });
  },
  methods: {
    change(value) {
      this.titleValue1 = value;
      this.list();
    },
    change2(value) {
      this.titleValue2 = value;
      this.list();
    },
    // 获取dataitem
    details(e) {
      const item = e.currentTarget.dataset.item;
      this.$router.push({
        name: "order_record_details",
        params: { item: item },
      });
    },
    list() {
      let userId = localStorage.getItem("userId");
      queryOrderRecord({
        date_end:
          this.titleValue2 == "9999" ? "20301230" : this.titleValue2 + "1230",
        date_start:
          this.titleValue2 == "9999" ? "20200101" : this.titleValue2 + "0101",
        order_status: this.titleValue1,
        page_number: 1,
        page_size: "999",
        user_id: userId,
        // user_id: "1ea47231118ef8d82554fd04e1b6e8de",
      }).then((data) => {
        if (data.code === 0) {
          let a = JSON.parse(data.data.orderInfos);
          this.model = a.details;
        } else {
          Dialog.alert({
            message: data.msg,
          }).then(() => {
            // on close
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.left_two_ts {
  display: flex;
  flex-wrap: wrap;
  flex: 3;
  font-size: 16px;
  font-family: PingFang SC;
  color: #464a4c;
}
.box {
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  background: #ffffff;
  // border-radius: 14px;
  .box_nei {
    width: 92%;
    margin: 0 auto;
    .top {
      display: flex;
      padding-top: 10px;
      align-items: baseline;
      width: 100%;
      min-height: 40px;
      img {
        position: absolute;
        top: 18px;
        width: 20px;
      }
      .left {
        flex: 4;
        font-size: 16px;
        font-family: PingFang SC;
        color: #464a4c;
      }
      .left_two {
        flex: 3;
        font-size: 16px;
        text-align: right;
        font-family: PingFang SC;
        color: #999999;
      }
    }
    .bottom {
      position: relative;
      width: 100%;
      height: 40px;
      span {
        position: absolute;
        top: 10px;
        left: 0;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #464a4c;
      }
    }
  }
}
</style>


