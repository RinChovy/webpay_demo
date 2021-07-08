<template>
  <div class="mainwrap">
    <div>
      <van-search
        style="opacity: 0.8"
        shape="round"
        background="transparent"
        v-model="selectModel.itemName"
        placeholder="项目名称"
        @search="select"
      />
    </div>
    <div class="div_middle" v-for="(v, k) in data" :key="k">
      <div class="form">
        <div class="icon">
          <span>{{ v.index }}</span>
        </div>
        <div class="form_box">
          <div class="form_label">
            <img src="../../public/images/phone/paycode.png" />
            <span>{{ v.itemCode }}</span>
          </div>
        </div>
        <div class="form_box">
          <div class="form_label">
            <img src="../../public/images/phone/xiangmu.png" />
            <span>{{ v.itemName }}</span>
          </div>
        </div>
        <div class="form_box_2">
          <div class="form_box_item" v-for="(v2, k2) in v.docNos" :key="k2">
            <img src="../../public/images/phone/zhece.png" />
            <span>{{ v2 }}</span>
            <button @click="look(v2)">查看</button>
          </div>
        </div>
      </div>
    </div>
    <van-pagination v-model="currentPage" :page-count="page_count" @change="change" />
  </div>
</template>

<script>
import { Button, Search, Dialog, Pagination } from 'vant'
import { searchItemInfo, searchPolicyDocument } from '../../config/services.js'
export default {
  name: 'policy',
  components: {
    'van-button': Button,
    'van-search': Search,
    'van-dialog': Dialog,
    'van-pagination': Pagination,
  },
  data() {
    return {
      //遍历数据
      data: [],
      selectModel: {
        itemName: '',
      },
      //当前页码
      currentPage: '1',
      //总页数
      page_count: '',
      //session
      sessionPage: '',
      sessionItemName: '',
    }
  },
  //加载前生命周期
  beforeCreate() {},
  //初始生命周期
  created() {
    //下一页返回记录页码和搜索框
    let sessionItemName = localStorage.getItem('sessionItemName')
    let sessionPage = localStorage.getItem('sessionPage')
    sessionItemName ? ((this.selectModel.itemName = sessionItemName), (this.sessionItemName = sessionItemName)) : null
    sessionPage ? (this.tableList(sessionPage), (this.sessionPage = sessionPage)) : this.tableList()
    localStorage.removeItem('sessionPage')
    localStorage.removeItem('sessionItemName')
  },
  //销毁前
  beforeDestroy() {
    //下一页返回记录页码和搜索框但是刷新不返回
    localStorage.removeItem('sessionPage')
    localStorage.removeItem('sessionItemName')
    localStorage.setItem('sessionPage', this.sessionPage)
    localStorage.setItem('sessionItemName', this.sessionItemName)
  },
  methods: {
    // 刷新页面方法
    tableList(page) {
      let that = this
      const { selectModel } = this
      searchItemInfo({
        pageNo: page ? page : '1',
        pageSize: 10,
        ...selectModel,
      }).then((res) => {
        if (res.code === 0) {
          const listArr = res.data.itemList.map((item, i) => {
            return { ...item, index: i + 1 }
          })
          that.page_count = res.data.totalPage
          that.data = listArr
          that.currentPage = page ? page : '1'
        } else {
          that.handleError(res)
        }
      })
    },
    // 接口失败
    handleError(err) {
      Dialog.alert({
        message: err.msg,
      }).then(() => {})
    },
    change(e) {
      this.tableList(e)
      this.sessionPage = e
    },
    select() {
      this.tableList()
      this.sessionItemName = this.selectModel.itemName
    },
    look(value) {
      let that = this
      searchPolicyDocument({
        title: value,
      }).then((res) => {
        if (res.code === 0) {
          localStorage.setItem('policyData', JSON.stringify(res.data))
          this.$router.push({
            path: '/policy_detail',
            name: 'policy_detail',
          })
        } else {
          that.handleError(res)
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.div_middle {
  width: 94%;
  margin: 10px auto;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.paied {
  position: absolute;
  width: 100px;
  top: 68px;
  right: 50px;
}
.form {
  position: relative;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  div.icon {
    position: absolute;
    width: 35px;
    height: 35px;
    background-image: url('../../public/images/icon/biaoqian.png');
    background-size: 100%;
    top: 0px;
    right: 20px;
    text-align: center;
    color: white;
    font-size: 18px;
  }
}
.form_box {
  width: 100%;
  min-height: 50px;
}
.form_box_2 {
  width: 100%;
}
.form_label {
  position: relative;
  img {
    margin-left: 4%;
    width: 20px;
  }
  span {
    margin-left: 5px;
    vertical-align: -3px;
    font-size: 14px;
  }
}
.form_box_item {
  position: relative;
  margin-bottom: 5px;
  img {
    margin-left: 4%;
    width: 20px;
  }
  span {
    margin-left: 5px;
    vertical-align: -3px;
    font-size: 14px;
    color: #4690ff;
  }
  button {
    width: 60px !important;
    color: white;
    border-radius: 30px;
    border: 1px solid #4690ff;
    background-color: #4690ff;
    position: absolute;
    right: 10px;
    font-size: 14px;
  }
}
.form_input_warn {
  width: 100%;
  margin-top: 8px;
  span {
    margin-left: 5%;
    font-size: 13px;
    color: red;
  }
}

.form_input_code {
  margin-top: 10px;
  width: 100%;
  input {
    color: #999ea0;
    font-size: 17px;
    padding-left: 10px;
    height: 35px;
    background-color: #f4f4f4;
    border: 0px solid #ddd;
    width: 46%;
    margin-left: 4%;
    border-radius: 4px;
  }
  img {
    vertical-align: -12px;
    width: 86px;
    height: 35px;
  }
}

.button_box {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  button {
    width: 94%;
    height: 44px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #4690ff), color-stop(100%, #556ffe));
    border-radius: 4px;
    border: 0px;
    color: white;
    font-size: 19px;
  }
}
</style>
