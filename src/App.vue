<template>
  <VApp>
    <VAppBar
      class="flex-grow-0"
      color="teal"
      dark
    >
      <VTabs>
        <VTab :to="{ name: 'task-info' }">
          {{ $t('tab-info') }}
        </VTab>

        <VTab :to="{ name: 'map' }">
          {{ $t('tab-map') }}
        </VTab>
      </VTabs>

      <VBtn icon>
        <VIcon>mdi-menu</VIcon>
      </VBtn>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<i18n>
{
  "en": {
    "tab-info": "Task info",
    "tab-map": "Map"
  },
  "ru": {
    "tab-info": "Информация о задании",
    "tab-map": "Карта"
  }
}
</i18n>
