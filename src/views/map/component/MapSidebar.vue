<template>
  <VSheet class="map-sidebar">
    <div class="mx-3 my-2 d-flex justify-space-between">
      <div class="text-h6">{{ $t("title") }}</div>

      <VProgressCircular v-if="isLoading" class="mr-2" color="primary" indeterminate/>
    </div>

    <VDivider />

    <VList class="sidebar-list" :disabled="isLoading">
      <VListItemGroup>
        <VListItem v-for="point in mapPoints" :key="point.id">
          <VListItemContent>
            <VListItemTitle>{{ point.title }}</VListItemTitle>

            <VListItemSubtitle>{{ point.address }}</VListItemSubtitle>
          </VListItemContent>

          <VListItemAction>
            <VBtn v-if="!isLoading" icon color="red" @click="deletePoint(point.id)">
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VListItemAction>
        </VListItem>
      </VListItemGroup>
    </VList>
  </VSheet>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.map.isLoading;
    },

    mapPoints() {
      return this.$store.state.map.mapPoints;
    },
  },

  created() {
    this.$store.dispatch("map/fetchMapPoints");
  },

  methods: {
    deletePoint(id) {
      this.$store.dispatch("map/removeMapPoint", id).then(() => {
        this.$store.dispatch("map/fetchMapPoints");
      });
    },
  },
};
</script>

<style scoped lang="scss">
.map-sidebar {
  max-height: 100%;
  display: flex;
  flex-direction: column;

  .sidebar-list {
    width: 400px;
    overflow-y: auto;
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Markers list"
  },
  "ru": {
    "title": "Список маркеров"
  }
}
</i18n>
