import '@babel/polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Home from './pages/home/index.vue';
import Education from './pages/education/index.vue';
import Education_wx from './pages/education_wx/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
import Success from './pages/success/index.vue';
import Success_wx from './pages/success_wx/index.vue';
import Fail from './pages/fail/index.vue';
// import Error404 from './pages/error404.vue';
//////////////小程序日志插件/////////////////////////////
import VConsole from 'vconsole';

// if (process.env.NODE_ENV === 'production') {
new VConsole();
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
    path: '/phone_pay', //非税缴款界面
    name: 'phone_pay',
    component: Index_pay,
  },
  {
    path: '/nontaxPage', //非税缴款界面
    name: 'nontaxPage',
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
    path: '/phone_index', //首页
    name: 'phone_index',
    component: Home,
  },
  {
    path: '/education', //教育缴费选择学校
    name: 'education',
    component: Education,
  },
  {
    path: '/getSchoolInfo', //教育缴费选择学校_wx
    name: 'getSchoolInfo',
    component: Education_wx,
  },
  // {
  //   path: '*',
  //   component: Error404,
  // },
];
const router = new VueRouter({
  mode: 'history',
  base: '/G_210000_m',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
