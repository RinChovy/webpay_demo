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
      <van-dropdown-item v-model="value2" :options="option2" get-container="body" @change="change2" />
    </van-dropdown-menu>
    <div>
      <div v-for="(k, index) in model" class="box" :key="index">
        <div @click="details" :data-item="JSON.stringify(k)">
          <div class="box_nei">
            <div class="top">
              <span class="left"
                ><span class="left_two_ts" v-for="(m, n) in JSON.parse(k.item_name_set)" :key="n">
                  <span>{{ JSON.parse(k.item_name_set)[0].itemName }}...</span>
                </span></span
              >

              <span class="left_two" style="color: #333333; font-weight: 600">￥{{ k.fmat }}</span>
            </div>
          </div>
          <div class="box_nei">
            <div class="top">
              <span class="left">{{ k.create_time }}</span>
              <span
                class="left_two"
                style="color: #00d414"
                v-if="k.order_status == '1' || k.order_status == '2' || k.order_status == '3' || k.order_status == '4'"
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
import { DropdownMenu, DropdownItem, Dialog } from 'vant'
import API from '../../config/api.js'
import { queryOrderRecord } from '../../config/services.js'

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
      title1: '缴款状态', //缴款状态title
      title2: '缴款年份', //缴款年份title
      titleValue1: '0,1,-1,2,3,4,5,6', //缴款状态value
      titleValue2: '9999', //缴款年份value
      value1: '0,1,-1,2,3,4,5,6',
      value2: '9999',
      option1: [
        { text: '全部状态', value: '0,1,-1,2,3,4,5,6' },
        { text: '缴款成功', value: '1,2,3,4' },
        { text: '处理中', value: '0,-1' },
        { text: '退款', value: '5,6' },
      ],
      option2: [
        { text: '全部年份', value: '9999' },
        { text: '2020', value: '2020' },
        { text: '2021', value: '2021' },
        { text: '2022', value: '2022' },
      ],
    }
  },
  mounted() {
    //加载完成执行
    let that = this
    let userId = localStorage.getItem('userId')
    console.log('userId...', userId)
    if (userId) {
      console.log('queryOederRecord')
      that.queryRecordList(userId)
    } else {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            // 微信小程序
            console.log('---微信小程序')
            const url = location.href
            if (url.indexOf('openid=') != -1) {
              const openid = that.GetQueryValue('openid')
              console.log('openid为' + openid)
              if (openid != '' && openid != null) {
                localStorage.removeItem('openid')
                localStorage.setItem('openid', openid)
              }
            }
            if (url.indexOf('userId=') != -1) {
              const userId = that.GetQueryValue('userId')
              console.log('userId' + userId)
              if (userId != '' && userId != null) {
                localStorage.removeItem('userId')
                localStorage.setItem('userId', userId)
                that.queryRecordList(userId)
              }
            }
          } else {
            //微信环境
            console.log('---微信环境')
          }
        })
      }
    }
  },
  methods: {
    queryRecordList(userId) {
      queryOrderRecord({
        date_end: '20300101',
        date_start: '20200101',
        order_status: '0,1,-1,2,3,4,5,6',
        page_number: 1,
        page_size: '999',
        user_id: userId,
        // user_id: "fb1457e5680e1c80a97076976fae0764",
      }).then((data) => {
        console.log('data---', data)
        if (data.code === 0) {
          let a = JSON.parse(data.data.orderInfos)
          this.model = a.details
          a.details.length < 1 &&
            Dialog.alert({
              message: '暂无订单记录',
            }).then(() => {
              // on close
            })
        } else {
          Dialog.alert({
            message: data.msg,
          }).then(() => {
            // on close
          })
        }
      })
    },
    GetQueryValue(queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return ''
      }
    },
    change(value) {
      this.titleValue1 = value
      this.list()
    },
    change2(value) {
      this.titleValue2 = value
      this.list()
    },
    // 获取dataitem
    details(e) {
      const item = e.currentTarget.dataset.item
      this.$router.push({
        name: 'order_record_details',
        params: { item: item },
      })
    },
    list() {
      let userId = localStorage.getItem('userId')
      let that = this
      queryOrderRecord({
        date_end: this.titleValue2 == '9999' ? '20301230' : this.titleValue2 + '1230',
        date_start: this.titleValue2 == '9999' ? '20200101' : this.titleValue2 + '0101',
        order_status: this.titleValue1,
        page_number: 1,
        page_size: '999',
        user_id: userId,
        // user_id: "1ea47231118ef8d82554fd04e1b6e8de",
      }).then((data) => {
        if (data.code === 0) {
          let a = JSON.parse(data.data.orderInfos)
          this.model = a.details
          a.details.length < 1 &&
            Dialog.alert({
              message: '暂无订单记录',
            }).then(() => {
              // on close
            })
        } else {
          Dialog.alert({
            message: data.msg,
          }).then(() => {
            // on close
          })
        }
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


