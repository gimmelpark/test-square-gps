import Vue from "vue";
import Vuex from "vuex";

import mapStore from "@/views/map/etc/map.store";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { map: mapStore },
});

export default store;
