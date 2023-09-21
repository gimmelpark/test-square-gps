<template>
  <div class="map-view">
    <MapSidebar />

    <Map />
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
};
</script>

<style scoped lang="scss">
.map-view {
  display: flex;
  height: calc(100vh - 64px);
}
</style>
