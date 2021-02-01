import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Entry from './pages/entry.vue';
import About from './pages/about.vue';
import Home from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';

window.enableDev = true;

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/home',  //首页
    component: Home,
  },
  {
    path: '/index_pay',  //非税缴款界面
    component: Index_pay,
  },
  {
    path: '/about',
    component: About,
  },
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
