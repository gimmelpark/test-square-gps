import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const locales = {
  RU: {
    code: "ru",
    title: "Русский",
  },
  EN: {
    code: "en",
    title: "English",
  },
};

const i18n = new VueI18n({
  locale: locales.RU.code,
});

export default i18n;
