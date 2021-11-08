<template>
  <div>
    <div>
      <div v-for="(k, index) in model" class="box" :key="index">
        <div @click="details(k.payCode, k.payer)" :data-item="JSON.stringify(k)">
          <div class="box_nei">
            <div class="top">
              <span class="left">
                <span>{{ k.payCode }}</span>
              </span>

              <span class="left_two" style="color: #333333; font-weight: 600"
                >￥{{ parseFloat(k.totalAmount / 100).toFixed(2) }}</span
              >
            </div>
          </div>
          <div class="box_nei">
            <div class="top">
              <span class="left">{{ k.itemNames }}</span>
              <span class="left_two" style="color: #00d414" v-if="k.payStatus == '1'">已缴款</span>
              <span class="left_two" style="color: red" v-else>未缴款</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryPayInfoNoCode } from '../../config/services.js'

export default {
  //   name: "wx_charge",
  components: {
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'van-dialog': Dialog,
  },
  data() {
    return {
      model: [], //数据状态
    }
  },
  mounted() {
    //加载完成执行
    const dateString = JSON.parse(localStorage.getItem('dataList'))
    console.log(dateString.data.payBookList)
    this.model = dateString.data.payBookList
  },
  methods: {
    // 获取dataitem
    details(a, b) {
      queryPayInfoNoCode({
        payCode: a,
        payPeople: b,
      }).then((res) => {
        res.code === 0 ? this.handleSuccess(res) : that.handleError(res.msg)
      })
    },
    // 提交成功
    handleSuccess(data) {
      localStorage.setItem('data', JSON.stringify(data))
      this.$router.push({
        path: '/index_charge',
        name: 'index_charge',
      })
    },
  },
}
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


