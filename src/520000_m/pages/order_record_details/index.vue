<template>
  <div>
    <div class="box">
      <img src="../../public/images/phone/top_logo.png" />
      <div class="box_nei">
        <div class="top_logo">
          <span>{{ model.fmat }}元</span>
        </div>
        <div class="top_logo">
          <span
            style="color: #00d414"
            v-if="
              model.order_status == '1' ||
              model.order_status == '2' ||
              model.order_status == '3' ||
              model.order_status == '4'
            "
            >已缴款</span
          >
          <span style="color: #00d414" v-else-if="model.order_status == '5' || model.order_status == '6'">退款</span>
          <span style="color: #ee8835" v-else>处理中</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">缴款码</span>
          <span class="left_two">{{ model.order_no }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">缴款时间</span>
          <span class="left_two">{{ model.create_time }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">支付方式</span>
          <span class="left_two">{{ model.channel_name }}</span>
        </div>
      </div>

      <div class="box_nei">
        <div class="top">
          <span class="left">支付订单号</span>
          <span class="left_two">{{ model.pay_code }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">执收单位</span>
          <span class="left_two">{{ model.payment_name }}</span>
        </div>
      </div>
      <div class="xian">
        <div class="box_nei">
          <div class="top">
            <!-- <img src="../../public/images/phone/shoufeih.png" /> -->
            <span class="left">缴款项目</span>
            <span class="left_two">金额</span>
          </div>
        </div>
        <div class="box_nei" style="padding-bottom: 10px">
          <div class="item_box" v-for="i in JSON.parse(model.item_name_set)" :key="i">
            <span class="left">{{ i.itemName }}</span>
            <span class="right">{{ i.amt }}元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryOrderRecord, getOpenid, getOpenPlatformUserid } from '../../config/services.js'

export default {
  //   name: "wx_charge",
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'van-dialog': Dialog,
  },
  data() {
    return {
      model: JSON.parse(this.$route.params.item), //数据状态
    }
  },
  mounted() {
    console.log(this.model)
  },
  methods: {},
}
</script>
<style scoped lang="scss">
.box {
  position: relative;
  width: 94%;
  margin: 50px auto 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding-top: 40px;
  img {
    position: absolute;
    left: 50%;
    top: -35px;
    margin-left: -35px;
    width: 70px;
  }
  .box_nei {
    width: 92%;
    margin: 0 auto;
    .top_logo {
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
      }
    }
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
        flex: 1;
        font-size: 16px;
        font-family: PingFang SC;
        color: #999999;
      }
      .left_two {
        flex: 2;
        font-size: 16px;
        font-family: PingFang SC;
        color: #464a4c;
        text-align: right;
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
  .item_box {
    width: 100%;
    margin: 10px auto;
    display: flex;

    span {
      font-size: 15px;
    }
    .left {
      color: #999999;
      flex: 2;
    }
    .right {
      text-align: right;
      flex: 1;
    }
  }
  .xian {
    width: 100%;
    border-top: 1px dashed #f3f3f3;
  }
}
</style>


