import '@babel/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Acityservice from './pages/acityservice/index.vue';
import Phone_index from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_payEn from './pages/index_payEn/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
import Success from './pages/success/index.vue';
import Success_wx from './pages/success_wx/index.vue';
import Fail from './pages/fail/index.vue';
import Order_record from './pages/order_record/index.vue';
import Order_record_details from './pages/order_record_details/index.vue';
import Policy from './pages/policy/index.vue';
import Policy_detail from './pages/policy_detail/index.vue';
import Error404 from './pages/error404.vue';

//////////////小程序日志插件/////////////////////////////
// import VConsole from 'vconsole';

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
    path: '/index_payEn', //非税缴款界面
    name: 'index_payEn',
    component: Index_payEn,
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
    path: '/success_wx', //成功回调页之小程序
    name: 'success_wx',
    component: Success_wx,
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
    path: '/order_record_details', //微信小程序页详情页
    name: 'order_record_details',
    component: Order_record_details,
  },
  {
    path: '/acityservice', //支付宝小程序页
    name: '/acityservice',
    component: Acityservice,
  },
  {
    path: '/policy', //政策文件依据
    name: 'policy',
    component: Policy,
  },
  {
    path: '/policy_detail', //政策文件依据下载
    name: 'policy_detail',
    component: Policy_detail,
  },

  // {
  //   path: '*',
  //   component: Error404,
  // },
];
const router = new VueRouter({
  mode: 'history',
  base: '/620000_m',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
