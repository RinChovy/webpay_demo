import '@babel/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_pay_traffic from './pages/index_pay_traffic/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
import Success from './pages/success/index.vue';
import Fail from './pages/fail/index.vue';
// import Error404 from './pages/error404.vue';
import Acityservice from './pages/acityservice';
import Order_record from './pages/order_record/index.vue';
import Order_record_details from './pages/order_record_details/index.vue';
//////////////小程序日志插件/////////////////////////////
import VConsole from 'vconsole';

// if (process.env.NODE_ENV === 'production') {
// new VConsole();
// }
//////////////小程序日志插件/////////////////////////////
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
    path: '/index_door', //首页
    name: 'index_door',
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
    path: '/index_pay_traffic', //交罚缴款界面
    name: 'index_pay_traffic',
    component: Index_pay_traffic,
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
    path: '/acityservice',
    name: 'acityservice',
    component: Acityservice,
  },
  {
    path: '/order_record', //微信小程序页
    name: 'order_record',
    component: Order_record,
  },
  {
    path: '/order_record_details', //微信小程序页详情页
    name: 'order_record_details',
    component: Order_record_details,
  },
];
const router = new VueRouter({
  mode: 'history',
  // base: '/pay',
  base: '/webpay_520000',
  // base: '/520000',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
