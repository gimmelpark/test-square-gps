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
  }),

  computed: {
    currentLocale() {
      return i18n.locale;
    },
  },

  methods: {
    onLocaleClick(code) {
      if (this.currentLocale !== code) {
        i18n.locale = code;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.active {
}
</style>

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
