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
  <div class="button" v-if="!alipay">
    <button @click="down">点击下载</button>
  </div>
</template>

<script>
import Api from '../../config/api'
import { downLoadPolicyDocument } from '../../config/services.js'
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
      file: '',
      alipay: false, //判断是否支付宝
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
    this.file = policyData.file
    //判断支付宝是否
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.alipay = true
    } else if (ua.match(/Alipay/i) == 'alipay') {
      this.alipay = true
    } else {
      this.alipay = false
    }
  },
  methods: {
    // 刷新页面方法
    down() {
      const { docNo, file } = this
      const mimeMap = {
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        zip: 'application/zip',
      }
      downLoadPolicyDocument({
        title: docNo,
        fileStr: file,
      }).then((res) => {
        this.resolveBlob(res, mimeMap.zip)
      })
    },
    resolveBlob(res, mimeType) {
      console.log(res)
      console.log(res.headers)
      const aLink = document.createElement('a')
      var blob = new Blob([res.data], { type: mimeType })
      // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
      var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
      var contentDisposition = decodeURI(res.headers['Content-Disposition'])
      var result = patt.exec(contentDisposition)
      var fileName = result[1]
      fileName = fileName.replace(/\"/g, '')
      aLink.href = URL.createObjectURL(blob)
      aLink.setAttribute('download', fileName) // 设置下载文件名称
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
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
    font-size: 18px;
  }
}
</style>
