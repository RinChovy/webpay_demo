 <template>
  <div class="mainwrap">
    <div>
      <van-search v-model="value" placeholder="请输入学校名称" @input="selectSchool" background="#efefef" />
    </div>
    <div class="top">
      <span>请选择学校</span>
    </div>
    <div class="middle">
      <div
        class="box"
        v-for="(v, k) in homeList"
        :key="k"
        @click="box_click(v.thirdMerchantUrl, v.merchantID)"
        :class="homeListHover == v.merchantID ? 'green' : ''"
      >
        <div class="left">
          <span>{{ v.unitName }}</span>
        </div>
        <div class="right">
          <img v-if="homeListHover == v.merchantID" src="../../public/images/phone/icon_yes.png" />
          <img v-else src="../../public/images/phone/icon_no.png" />
        </div>
      </div>
    </div>
    <div class="bottom"><button class="button" @click="sumbit">确定</button></div>
  </div>
</template>
 <script>
import { school, getSchoolInfo } from '../../config/services.js'
import { Search, Dialog, Button } from 'vant'
export default {
  name: 'home',
  components: {
    'van-search': Search,
    'van-dialog': Dialog,
  },
  data() {
    return {
      thirdMerchantUrlHover: '', //跳转地址
      homeListHover: '', //选中标识
      homeList: [],
      homeListConst: [], //首页列表
      value: '', //搜索框内容
    }
  },
  created() {},
  mounted() {
    let that = this // 初始化城市列表
    const itemCode = localStorage.getItem('itemCode')
    const cityCode = localStorage.getItem('cityCode')
    const url = location.href
    const areaId = url.substring(url.indexOf('areaId=') + 7)
    getSchoolInfo({
      areaId: areaId,
    }).then((res) => {
      res.code === 0
        ? res.data.schoolList.length > 0
          ? ((that.homeListConst = res.data.schoolList), (that.homeList = res.data.schoolList))
          : Dialog.alert({
              message: '当前城市无学校',
            }).then(() => {})
        : Dialog.alert({
            message: res.msg,
          }).then(() => {})
    })
  },
  methods: {
    // 选择学校事件
    box_click(thirdMerchantUrl, merchantID) {
      this.homeListHover = merchantID
      this.thirdMerchantUrlHover = thirdMerchantUrl
    },
    selectSchool() {
      // 判断搜索
      let list = this.homeListConst.filter((item) => item.unitName.indexOf(this.value) >= 0)
      console.log(list)
      this.homeList = list
    },
    // 点击确认
    sumbit() {
      this.thirdMerchantUrlHover == ''
        ? Dialog.alert({
            message: '请选择学校',
          }).then(() => {})
        : (window.location.href = this.thirdMerchantUrlHover)
    },
  },
}
</script>
 
 <style scoped lang="scss">
// .mainwrap {
//   background: #efefef;
// }
.green {
  background: #f0fbf8;
}
.top {
  width: 100%;
  background: #efefef;
  height: 28px;
  display: flex;
  // justify-content: center;
  align-items: center;
  span {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #a1abb3;
    margin-left: 5%;
  }
}
.middle {
  width: 100%;
  padding-bottom: 70px;
  .box {
    width: 100%;
    height: 43px;
    border-bottom: 1px solid #efefef;
    display: flex;
    .left {
      flex: 8;
      display: flex;
      // justify-content: center;
      align-items: center;
      span {
        margin-left: 20px;
      }
    }
    .right {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 70px;
  position: fixed;
  background: #efefef;
  bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  width: 90%;
  height: 42px;
  background: linear-gradient(315deg, #00db9b 0%, #00d87e 100%);
  border: 0rem solid #0a628f;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>