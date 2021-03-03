import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import App from "./index.vue";
import Home from "./pages/home/index.vue";
import Home_ali from "./pages/home_ali/index.vue";
import Index_pay from "./pages/index_pay/index.vue";
import Index_charge from "./pages/Index_charge/index.vue";
import Success from "./pages/success/index.vue";
import Fail from "./pages/fail/index.vue";
import Wx_charge from "./pages/wx_charge";

window.enableDev = true;

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/home", //首页
    component: Home,
  },
  {
    path: "/index_pay", //非税缴款界面
    component: Index_pay,
  },
  {
    path: "/index_charge", //缴款书界面
    name: "Index_charge",
    component: Index_charge,
  },
  {
    path: "/success", //成功回调页
    component: Success,
  },
  {
    path: "/fail", //失败回调页
    component: Fail,
  },
  {
    path: "/wx_charge", //微信小程序页
    component: Wx_charge,
  },
  {
    path: "/home_ali", //支付宝小程序页
    component: Home_ali,
  },
];
const router = new VueRouter({
  // mode: "history",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
