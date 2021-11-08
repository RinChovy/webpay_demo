<template>
  <div class="box"></div>
</template>

<script>
import { Dialog } from 'vant'
import { checkBankQRCode } from '../../config/services.js'
export default {
  name: 'out',
  components: {
    'van-dialog': Dialog,
  },
  data() {
    return {}
  },
  //加载生命周期
  created() {
    let url = location.href
    let rsa = url.substring(url.indexOf('?') + 1)
    let json = rsa.split('&')
    let data = {}
    json.map((v, k) => {
      let dataModel = v.split('=')[0]
      let dataModel2 = v.split('=')[1]
      data[dataModel] = dataModel2
    })
    checkBankQRCode(data).then((res) => {
      if (res.code === 0) {
        window.location.href = res.data.url
      } else {
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          // on close
        })
      }
    })
  },
  methods: {},
}
</script>

<style scoped lang="scss">
</style>
