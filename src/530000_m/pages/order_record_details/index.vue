<template>
  <div>
    <div class="box">
      <img src="../../public/images/phone/icon_2.png" />
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
        <div class="top" v-if="!isMerge">
          <span class="left">缴款码</span>
          <span class="left_two">{{ model.pay_code }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top" v-if="!isMerge">
          <span class="left">缴款人</span>
          <span class="left_two">{{ model.payer_name }}</span>
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
          <span class="left_two">{{ model.order_no }}</span>
        </div>
      </div>
      <div class="box_nei">
        <div class="top">
          <span class="left">执收单位</span>
          <span class="left_two">{{ model.payment_name }}</span>
        </div>
      </div>
      <!-- 非合单 -->
      <div class="xian" v-if="!isMerge">
        <div class="box_nei">
          <div class="top">
            <!-- <img src="../../public/images/phone/shoufeih.png" /> -->
            <span class="left">项目信息</span>
          </div>
        </div>
        <div
          v-if="model.item_name_set != '' && model.item_name_set != null && model.item_name_set != 'null'"
          class="box_nei"
          style="padding-bottom: 10px"
        >
          <div class="item_box" v-for="i in JSON.parse(model.item_name_set)" :key="i.itemIdCode">
            <span class="left">{{ i.itemName }}</span>
            <span class="right">{{ i.amt }}元</span>
          </div>
        </div>

        <div v-else class="box_nei" style="padding-bottom: 10px">
          <div class="item_box">
            <span class="left">教育缴费</span>
            <span class="right">{{ model.fmat }}元</span>
          </div>
        </div>

        <div class="bottomV" v-if="url !== '' && url != null">
          <div class="div_button">
            <button @click="einvoice_url(url)">查看电子票据</button>
          </div>
        </div>
      </div>
      <!-- 合单 -->
      <div v-if="isMerge" style="padding-bottom: 10px">
        <div class="box_nei" style="border-bottom: 3px solid #f3f3f3">
          <div class="top">
            <!-- <img src="../../public/images/phone/shoufeih.png" /> -->
            <span class="left">订单信息</span>
          </div>
        </div>
        <div class="box_nei" v-for="(i, id) in billList" :key="i.noticeNo">
          <div
            :style="
              id == billList.length - 1 && !(i.billUrl !== '' && i.billUrl != null && i.billUrl != 'null')
                ? ''
                : 'border-bottom: 1px dashed #f3f3f3'
            "
          >
            <div class="item_box">
              <span class="left">证件号</span>
              <span class="right">{{ i.idCard }}</span>
            </div>
            <div class="item_box">
              <span class="left">缴款人</span>
              <span class="right">{{ i.paymentUnit }}</span>
            </div>

            <div class="item_box" v-for="(it, index) in i.items" :key="index">
              <span class="left">{{ it.itemName }}</span>
              <span class="right">¥{{ it.actualAmt }}元</span>
            </div>
          </div>

          <div
            v-if="i.billUrl !== '' && i.billUrl != null && i.billUrl != 'null'"
            style="padding: 10px 0px; text-align: right"
            :style="id == billList.length - 1 ? '' : 'border-bottom: 3px solid #f3f3f3;'"
          >
            <button @click="einvoice_url(i.billUrl)" style="border: 1px solid #999; border-radius: 3px">
              查看电子票据
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryRealTime, qeryBill } from '../../config/services.js'

export default {
  //   name: "wx_charge",
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'van-dialog': Dialog,
  },
  data() {
    return {
      url: '',
      model: JSON.parse(this.$route.params.item), //数据状态
      isMerge: false, // 非税缴费默认false
      billList: [],
    }
  },
  mounted() {
    console.log(this.model)
    if (
      this.model.order_status == '1' ||
      this.model.order_status == '2' ||
      this.model.order_status == '3' ||
      this.model.order_status == '4'
    ) {
      // 缴款成功 需查看电子票

      if (this.model.merchant_no == '5304002021121301') {
        // 门户 商户号： 5304002021121301
        const order_no = this.model.order_no
        queryRealTime({
          merchant_order_no: order_no,
        }).then((res) => {
          if (res.code === 0) {
            console.log(res)
            this.url = res.data.einvoice_url
          }
        })
      } else {
        // 不动产 商户号： 5304212021122801
        qeryBill({
          // orderNo: '681202453061914624',
          orderNo: this.model.order_no,
        }).then((res) => {
          console.log(res, 'res---')
          if (res.code === 1000) {
            this.isMerge = res.result.isMerge
            if (res.result.isMerge) {
              // 合单
              this.billList = res.result.billList
            } else {
              // 非合单
              this.url = res.result.billUrl
            }
          }
        })
      }
    }

    // else {
    //   qeryBill({
    //     orderNo: '681202453061914624',
    //   }).then((res) => {
    //     console.log(res, 'res---')
    //     if (res.code === 1000) {
    //       this.url = res.result.billUrl
    //     }
    //   })
    // }
  },
  methods: {
    einvoice_url(url) {
      console.log('---====---', url)
      window.location.href = url
    },
  },
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
  .bottomV {
    width: 100%;
    // height: 200px;
    padding-bottom: 20px;
    border-top: 1px dotted #e5e5e5;
    .div_button {
      width: 100%;
      margin: 30px auto;
      text-align: center;
      button {
        width: 70%;
        height: 44px;
        background: linear-gradient(90deg, #0e3ea9, #3075d3);
        border-radius: 35px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        border: 0;
      }
      button.cencel {
        width: 70%;
        height: 44px;
        background: white;
        border-radius: 35px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: black;
        border: 1px solid #5380e1;
      }
    }
  }
}
</style>


