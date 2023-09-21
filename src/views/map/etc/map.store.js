import FakeBackend from "../api/FakeBackend";
import { getAddressByCoords } from "../api/geo-coding.api";
import { FAKE_BACKEND_URL } from "./map.constants";

const mapStore = {
  namespaced: true,

  state: () => ({
    mapPoints: [],
    isLoading: false,
  }),

  mutations: {
    setMapPoints(state, points) {
      state.mapPoints = points;
    },

    setIsLoading(state, value) {
      state.isLoading = value;
    },
  },

  actions: {
    fetchMapPoints({ commit }) {
      commit("setIsLoading", true);

      return FakeBackend.get(FAKE_BACKEND_URL)
        .then(({ data }) => {
          commit("setMapPoints", data);
        })
        .catch(({ error }) => {
          window.alert(error);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },

    createNewMapPoint({ commit }, payload) {
      commit("setIsLoading", true);

      return getAddressByCoords(payload.coords)
        .then((address) => {
          return FakeBackend.post(FAKE_BACKEND_URL, {
            ...payload,
            address,
          });
        })
        .catch((error) => {
          window.alert(error);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },

    updateMapPoint({ commit }, point) {
      commit("setIsLoading", true);

      return FakeBackend.put(FAKE_BACKEND_URL, point)
        .catch(({ error }) => {
          window.alert(error);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },

    removeMapPoint({ commit }, id) {
      commit("setIsLoading", true);

      return FakeBackend.delete(FAKE_BACKEND_URL, id)
        .catch(({ error }) => {
          window.alert(error);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },
  },
};

export default mapStore;
