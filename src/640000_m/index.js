import '@babel/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Phone_index from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Education from './pages/index_pay_education/index.vue';
import Index_charge from './pages/index_charge/index.vue';
import Index_pay_idcard from './pages/index_pay_idcard/index.vue';
import Success from './pages/success/index.vue';
import Fail from './pages/fail/index.vue';
import CheckBankQRCode from './pages/out/index.vue';
import Error404 from './pages/error404.vue';

window.enableDev = true;

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home', //首页
    name: 'home',
    component: Home,
  },
  {
    path: '/checkBankQRCode.do', //out
    name: 'checkBankQRCode.do',
    component: CheckBankQRCode,
  },
  {
    path: '/phone_index', //首页另一个地址
    name: 'phone_index',
    component: Phone_index,
  },
  {
    path: '/index_pay', //非税缴款界面
    name: 'index_pay',
    component: Index_pay,
  },

  {
    path: '/index_pay.do', //非税缴款界面
    name: 'index_pay.do',
    component: Index_pay,
  },
  {
    path: '/education', //教育缴费页面
    name: 'education',
    component: Education,
  },
  {
    path: '/index_pay_idcard', //身份证查询页面
    name: 'index_pay_idcard',
    component: Index_pay_idcard,
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
  // {
  //   path: '*',
  //   component: Error404,
  // },
];
const router = new VueRouter({
  mode: 'history',
  base: '/640000',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
