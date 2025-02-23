import Vue from 'vue'
import './plugins/fontawesome'
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import Vuex from "vuex";
import App from './App.vue'
import Metronic from "./plugins/metronic";
import "./filters";
// import axios from "axios";

// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

Vue.config.productionTip = false

Vue.use(Metronic);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(Vuex);
// Vue.use(axios);

/* eslint-disable no-new */

const store = new Vuex.Store(require("./store"));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");