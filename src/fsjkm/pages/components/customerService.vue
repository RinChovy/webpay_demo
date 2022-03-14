<template>
  <div>
    <div :class="class_one">
      <img src="../../public/images/icon/icon.jpg" @click="handleClick" />
      <span>问题<br />反馈</span>
    </div>
  </div>
</template>

<script>
import { Sticky, Overlay, Icon } from 'vant';
import { userIssues } from '../../config/services.js';
export default {
  name: 'customerService',
  components: {
    'van-sticky': Sticky,
    'van-overlay': Overlay,
    'van-icon': Icon,
  },
  data() {
    return {
      // 内容
      url: '',
      show: false,
      class_one: 'classleft',
      url: '',
    };
  },
  created() {
    userIssues().then((res) => {
      res.code === 0 ? (this.url = res.data) : console.log(res);
    });
  },
  methods: {
    handleClick() {
      this.class_one != 'classleft classright'
        ? (this.class_one = 'classleft classright')
        : (window.location.href = this.url);
    },
  },
};
</script>

<style scoped lang="scss">
.classleft {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 15%;
  right: -28px;
  border: 1px solid #f2f3f5;
  border-right: 0px solid white;
  width: 65px;
  height: 40px;
  border-radius: 50px 0px 0px 50px;
  img {
    width: 30px;
    // position: absolute;
    margin-left: 6px;
  }
  span {
    font-size: 12px;
    vertical-align: 85%;
  }
}
.classright {
  animation-name: example;
  animation-duration: 0.5s;
  right: 0px;
}
.nuclassright {
  animation-name: example2;
  animation-duration: 0.5s;
  right: -28px;
}

@keyframes example {
  from {
    right: -28px;
  }
  to {
    right: 0px;
  }
}
@keyframes example2 {
  from {
    right: 0px;
  }
  to {
    right: -28px;
  }
}
</style>
