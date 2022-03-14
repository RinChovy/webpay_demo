<template>
  <div v-html="model"></div>
</template>

<script>
import { getPrivacyAuthInfo } from '../../config/services.js';
export default {
  name: 'privacy',
  components: {},
  data() {
    return {
      // 内容
      model: ``,
    };
  },
  created() {
    getPrivacyAuthInfo().then((res) => {
      res.code === 0 ? this.handleHtml(res.data.entitleInfo) : console.log('错误');
    });
  },
  methods: {
    handleHtml(e) {
      this.model = e;
    },
  },
};
</script>

<style scoped lang="scss"></style>
