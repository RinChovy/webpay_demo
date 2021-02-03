import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

<<<<<<< HEAD
import App from "./index.vue";
import Entry from "./pages/entry.vue";
import About from "./pages/about.vue";
import Home from "./pages/home/index.vue";
import Index_pay from "./pages/index_pay/index.vue";
import Index_charge from "./pages/Index_charge/index.vue";
import Success from "./pages/success/index.vue";
import Fail from "./pages/fail/index.vue";
=======
import App from './index.vue';
import Home from './pages/home/index.vue';
import Index_pay from './pages/index_pay/index.vue';
import Index_charge from './pages/Index_charge/index.vue';
>>>>>>> cd2aa5aedd58041d7a20cde4e83a276ff3c63db5

window.enableDev = true;

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
<<<<<<< HEAD
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
    path: "/about",
    component: About,
  },
=======
    path: '/home', //首页
    component: Home,
  },
  {
    path: '/index_pay', //非税缴款界面
    name: 'index_pay',
    component: Index_pay,
  },
  {
    path: '/index_charge', //非税缴款界面
    component: Index_charge,
  },
>>>>>>> cd2aa5aedd58041d7a20cde4e83a276ff3c63db5
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
