<template>
  <VSheet class="map-sidebar">
    <div class="mx-3 my-2 d-flex justify-space-between">
      <div class="text-h6">{{ $t("title") }}</div>

      <VProgressCircular
        v-if="isLoading"
        class="mr-2"
        color="primary"
        indeterminate
      />
    </div>

    <VDivider />

    <VList class="sidebar-list" :disabled="isLoading">
      <VListItemGroup :value="activeMapPointIndex" @change="onSelectMapPoint">
        <MapSidebarListItem
          v-for="(point, index) in mapPoints"
          :key="point.id"
          :point="point"
          :is-loading="isLoading"
          @save-changes="saveUpdatedTitle(point, $event)"
          @delete="deletePoint(point.id, index)"
        />
      </VListItemGroup>
    </VList>
  </VSheet>
</template>

<script>
import MapSidebarListItem from "./MapSidebarListItem.vue";

export default {
  components: {
    MapSidebarListItem,
  },

  props: {
    selectedPointId: {
      type: Number,
      default: undefined,
    },
  },

  data: () => ({
    editedPointIndex: null,
  }),

  computed: {
    isLoading() {
      return this.$store.state.map.isLoading;
    },

    mapPoints() {
      return this.$store.state.map.mapPoints;
    },

    activeMapPointIndex() {
      return this.mapPoints.findIndex(({ id }) => id === this.selectedPointId);
    },
  },

  methods: {
    deletePoint(id, index) {
      this.$store.dispatch("map/removeMapPoint", id).then(() => {
        this.$store.dispatch("map/fetchMapPoints");

        if (this.activeMapPointIndex === index) {
          this.$emit("update-selected-point", undefined);
        }
      });
    },

    onSelectMapPoint(index) {
      this.$emit(
        "update-selected-point",
        index !== undefined ? this.mapPoints[index].id : undefined,
      );
    },

    saveUpdatedTitle(point, title) {
      this.$store
        .dispatch("map/updateMapPoint", {
          ...point,
          title,
        })
        .then(() => {
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
