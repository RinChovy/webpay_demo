import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Acityservice from './pages/acityservice/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
import Success from './pages/success/index.vue';
import Fail from './pages/fail/index.vue';
import Order_record from './pages/order_record/index.vue';
import Error404 from './pages/error404.vue';

window.enableDev = true;

const routes = [
  {
    path: '/',
    redirect: '/phone_index',
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
    path: '/index_pay.do', //非税缴款界面
    name: 'index_pay.do',
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
    path: '/order_record', //微信小程序页
    name: 'order_record',
    component: Order_record,
  },
  {
    path: '/acityservice', //支付宝小程序页
    name: '/acityservice',
    component: Acityservice,
  },
  {
    path: '/phone_index', //首页
    name: 'phone_index',
    component: Home,
  },
  // {
  //   path: '*',
  //   component: Error404,
  // },
];
const router = new VueRouter({
  mode: 'history',
  base: '/webpay_370200',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
