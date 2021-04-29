<template>
  <div class="mainwrap">
  <div class="top" v-html="data">
  </div>
  <div>
    <div class="middle">
      <span>文号:{{ docNo }}</span>
    </div>
    <div class="middle">
      <span>发文日期:{{ issDate }}</span>
    </div>
    <div class="middle">
      <span>年度:{{ year }}</span>
    </div>
  </div>
  <div class="button">
    <button @click="down">点击下载</button>
  </div>
</template>

<script>
import Api from '../../config/api'
export default {
  name: 'policy',
  components: {},
  data() {
    return {
      //遍历数据
      data: '',
      docNo: '',
      issDate: '',
      year: '',
    }
  },
  //加载前生命周期
  beforeCreate() {},
  //初始生命周期
  created() {
    const policyData = JSON.parse(localStorage.getItem('policyData'))
    this.data = policyData.fabstract
    this.docNo = policyData.docNo
    this.year = policyData.year
    this.issDate = policyData.issDate
  },
  methods: {
    // 刷新页面方法
    down() {
      const { docNo } = this
      window.location.href = Api.downLoadPolicyDocument + '?title=' + encodeURIComponent(docNo)
    },
  },
}
</script>

<style scoped lang="scss">
.middle {
  width: 96%;
  margin: 0 auto;
  font-weight: bold;
}
.top {
  width: 96%;
  margin: 0 auto;
}
.button {
  width: 100%;
  text-align: center;
  padding-top: 20px;
  button {
    width: 80%;
    height: 40px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #4690ff), color-stop(100%, #556ffe));
    border-radius: 50px;
    border: 0px;
    color: white;
    font-size: 0.18px;
  }
}
</style>
