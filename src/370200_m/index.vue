<template>
  <div id="wrapper">
    <keep-alive>
      <router-view v-if="this.isAlive"></router-view>
    </keep-alive>
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
