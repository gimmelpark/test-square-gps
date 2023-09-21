<template>
  <div class="map-view">
    <MapSidebar
      :selected-point-id="selectedPointId"
      @update-selected-point="onUpdateSelectedPoint"
    />

    <Map
      ref="map"
      :selected-point-id="selectedPointId"
      @update-selected-point="onUpdateSelectedPoint"
    />
  </div>
</template>

<script>
import Map from "./Map.vue";
import MapSidebar from "./MapSidebar.vue";

export default {
  components: {
    MapSidebar,
    Map,
  },

  computed: {
    selectedPointId() {
      return +this.$route.query.mapPointId;
    },
  },

  created() {
    this.$store.dispatch("map/fetchMapPoints").then(() => {
      if (this.selectedPointId) {
        this.$refs.map.selectAndCenterOnFeature(this.selectedPointId);
      } else {
        this.$refs.map.centerOnCurrentPosition();
      }
    });
  },

  methods: {
    onUpdateSelectedPoint(id) {
      if (id !== this.selectedPointId) {
        this.$router.push({
          name: this.$route.name,
          query: id ? { mapPointId: id } : undefined,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.map-view {
  display: flex;
  height: calc(100vh - 64px);
}
</style>
