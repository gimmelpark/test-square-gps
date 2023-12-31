import Vue from "vue";
import VueRouter from "vue-router";

import vuetify from "@/plugins/vuetify";
import router from "@/plugins/router";
import i18n from "@/plugins/i18n";
import store from "@/plugins/vuex";

import App from "./App.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
