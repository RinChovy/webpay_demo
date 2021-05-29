<template>
  <div class="mainwrap">
    <div class="headern">
      <span class="haveCity" @click="city">切换城市：{{haveCity}}</span>
      <div class="middle">
        <div class="box" @click="indexPay(v.itemCode,v.modelUrl)" v-for="(v,k) in homeList" :key="k">
          <img :src="v.modelPicture" alt="" />
          <div>
            <span>{{v.itemName}}</span>
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
        <span>{{ bottom_span2 }}</span>
      </div>
    </div>
  <div v-if="areaList_Button==true">
    <div class="filterbg"></div>
    <div class="list">
      <van-area :area-list="areaList" :columns-num="2" @cancel="cancel" @confirm="confirm"/> 
    </div>
  </div>
</template>

<script>
import { getCityData, homeConfigInfo } from '../../config/services.js'
import { Button, Row, Col, Search, area } from 'vant'
export default {
  name: 'home',
  components: {
    'van-row': Row,
    'van-col': Col,
    'van-button': Button,
    'van-search': Search,
    'van-area': area,
  },
  data() {
    return {
      homeList: [], //首页列表
      value: 'value',
      good: 'value',
      bottom_span: '主办单位：辽宁省财政厅',
      bottom_span2: '服务电话：010-53520976',
      haveCity: '辽宁省本级', //城市选择
      haveCityCode: '210000', //城市选择代码
      areaList_Button: false, //控制插件
      areaList: {},
    }
  },
  created() {
    const url = location.href
    console.log('url为' + url)
    if (url.indexOf('openId=') != -1) {
      const rsa = url.substring(url.indexOf('openId=') + 7)
      console.log('rsa为' + rsa)
      const openId = rsa
      if (openId != '' && openId != null) {
        localStorage.removeItem('openId')
        localStorage.setItem('openId', openId)
      }
    }
    // 初始化城市列表
    getCityData({
      payCode: this.payCode,
    }).then((res) => {
      res.code === 0 ? (this.areaList = res.data.areaList) : console.log(res)
    })
    // 初始化菜单列表
    homeConfigInfo({
      regionCode: this.haveCityCode,
    }).then((res) => {
      res.code === 0 ? (this.homeList = res.data.businessModels.itemList) : console.log(res)
    })
  },
  methods: {
    indexPay(itemCode, modelUrl) {
      if (modelUrl.startsWith('http')) {
        window.location.href = modelUrl
      } else {
        let data = { itemCode: itemCode }
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('itemCode', itemCode)
        localStorage.setItem('cityCode', this.haveCityCode)
        console.log(itemCode)
        const url = modelUrl
        this.$router.push({
          path: '/' + url,
        })
      }
    },
    // 弹出框事件
    city() {
      this.areaList_Button = true
    },
    // 弹出框取消按钮
    cancel() {
      console.log(666)
      this.areaList_Button = false
    },
    // 弹出框确认按钮
    confirm(e) {
      console.log(e)
      this.haveCity = e[1].name
      this.haveCityCode = e[1].code
      this.areaList_Button = false
    },
  },
}
</script>

<style scoped lang="scss">
.filterbg {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background: #d3d3d3;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
}
.list {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1301;
}
.headern {
  width: 100%;
  background: url('../../public/images/phone_background.png') no-repeat;
  background-size: cover;
  height: 640px;
}
.middle {
  width: 90%;
  background: white;
  margin: 52% auto 0;
  padding-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-wrap: wrap;
}
.img {
  background: url('../../public/images/phone_box.png') no-repeat center;
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
  background: url('../../public/images/span_background.png') no-repeat center bottom;
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
  width: 50%;
  height: 100px;
  margin-top: 10px;
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
.haveCity {
  position: relative;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: white;
}
</style>
