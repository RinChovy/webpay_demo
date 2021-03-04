import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
import Success from './pages/success/index.vue';
import Fail from './pages/fail/index.vue';
import Error404 from './pages/error404.vue';

window.enableDev = true;

const routes = [
  {
    path: '/',
    // component: Home,
    redirect: '/home',
  },
  {
    path: '/home', //首页
    name: 'home',
    component: Home,
  },
  {
    path: '/index_pay', //非税缴款界面
    name: 'index_pay',
    component: Index_pay,
  },
  {
    path: '/index_charge', //缴款书界面
    name: 'index_charge',
    component: Index_charge,
  },
  {
    path: '/success', //成功回调页
    name: 'success',
    component: Success,
  },
  {
    path: '/fail', //失败回调页
    name: 'fail',
    component: Fail,
  },
  {
    path: '*',
    component: Error404,
  },
];
const router = new VueRouter({
  mode: 'history',
  base: '/230400_m',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
