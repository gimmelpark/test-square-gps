<template>
  <VApp>
    <VAppBar class="flex-grow-0" color="teal" dark>
      <VTabs>
        <VTab :to="{ name: 'task-info' }">
          {{ $t("tab-info") }}
        </VTab>

        <VTab :to="{ name: 'map' }">
          {{ $t("tab-map") }}
        </VTab>
      </VTabs>

      <VMenu>
        <template #activator="{ on, attrs }">
          <VBtn icon v-bind="attrs" v-on="on">
            <VIcon>mdi-earth</VIcon>
          </VBtn>
        </template>

        <VList>
          <VListItem
            v-for="locale in locales"
            :key="locale.code"
            :disabled="currentLocale === locale.code"
            @click="onLocaleClick(locale.code)"
          >
            {{ locale.title }}
          </VListItem>
        </VList>
      </VMenu>
    </VAppBar>

    <VMain class="grey lighten-3">
      <RouterView />
    </VMain>
  </VApp>
</template>

<script>
import i18n, { locales } from "@/plugins/i18n";

export default {
  data: () => ({
    locales,
    currentLocale: undefined,
  }),

  created() {
    this.currentLocale = localStorage.getItem("currentLocale");

    if (!this.currentLocale) {
      this.currentLocale = i18n.locale;
    } else {
      i18n.locale = this.currentLocale;
    }
  },

  methods: {
    onLocaleClick(code) {
      if (this.currentLocale !== code) {
        this.currentLocale = code;
        i18n.locale = code;
        localStorage.setItem("currentLocale", code);
      }
    },
  },
};
</script>

<i18n>
{
  "en": {
    "tab-info": "About the task",
    "tab-map": "Map"
  },
  "ru": {
    "tab-info": "О задании",
    "tab-map": "Карта"
  }
}
</i18n>
