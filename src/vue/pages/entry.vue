<template>
  <div class="mainwrap">
    <p>This is vue entry page!</p>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import {Button} from 'vant';
export default {
  name: "entry",
  components: {
    "van-button": Button,
  }
};
</script>

<style scoped lang="scss">
.mainwrap {
  padding: 10px;
}
</style>
