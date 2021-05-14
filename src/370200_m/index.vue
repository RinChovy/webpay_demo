<template>
  <div id="wrapper">
    <router-view v-if="isAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload,
      };
    },
    data() {
      return {
        isAlive: true,
      };
    },
    methods: {
      reload() {
        this.isAlive = false;
        this.$nextTick(() => {
          this.isAlive = true;
        });
      },
    },
  };
</script>
