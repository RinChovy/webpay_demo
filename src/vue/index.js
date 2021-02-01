import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './index.vue';
import Entry from './pages/entry.vue';
import About from './pages/about.vue';

window.enableDev = true;

const routes = [
  {
    path: '/',
    component: Entry,
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
