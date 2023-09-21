<template>
  <div class="map-container" :class="{ 'adding-mode': isAddingMode }">
    <div id="map" />

    <div class="map-controls">
      <VBtn fab tile small @click="onZoomClick(true)">
        <VIcon>mdi-plus</VIcon>
      </VBtn>

      <VBtn class="mt-2" fab tile small @click="onZoomClick(false)">
        <VIcon>mdi-minus</VIcon>
      </VBtn>

      <VBtn class="mt-2" icon small @click="onCurrentPositionButtonClick">
        <VIcon>mdi-crosshairs-gps</VIcon>
      </VBtn>
    </div>

    <div class="add-point-container">
      <VBtn
        fab
        tile
        small
        :loading="isLoading"
        :color="isAddingMode ? 'red' : 'primary'"
        @click="onAddingModeButtonClick"
      >
        <VIcon>
          {{ isAddingMode ? "mdi-map-marker-remove" : "mdi-map-marker-plus" }}
        </VIcon>
      </VBtn>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

import { createMap, setCurrentLocation } from "../etc/map.utils";

import {
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_CONTROL_SENSITIVITY,
} from "../etc/map.constants";

export default {
  data: () => ({
    map: undefined,
    zoom: 0,
    isAddingMode: false,
  }),

  computed: {
    isLoading() {
      return this.$store.state.map.isLoading;
    },

    mapPoints() {
      return this.$store.state.map.mapPoints;
    },
  },

  mounted() {
    this.map = createMap();

    this.map.on("click", this.onMapClick);

    this.map
      .getView()
      .on("change:resolution", debounce(this.onResolutionUpdate, 100));

    setCurrentLocation(this.map).then(() => {
      this.zoom = this.map.getView().getZoom();
    });
  },

  methods: {
    onMapClick(event) {
      if (this.isAddingMode && !this.isLoading) {
        console.log(this.mapPoints.length + 1);
        const newMarker = {
          coords: event.coordinate,
          title: this.$t("new-marker-title", {
            number: this.mapPoints.length + 1,
          }),
        };

        this.$store.dispatch("map/createNewMapPoint", newMarker).then(() => {
          this.isAddingMode = false;
          this.$store.dispatch("map/fetchMapPoints");
        });
      }
    },

    onAddingModeButtonClick() {
      if (!this.isLoading) {
        this.isAddingMode = !this.isAddingMode;
      }
    },

    onResolutionUpdate() {
      this.zoom = this.map.getView().getZoom();
    },

    onZoomClick(isPlus = false) {
      this.zoom = isPlus
        ? Math.min(this.zoom + ZOOM_CONTROL_SENSITIVITY, MAX_ZOOM)
        : Math.max(this.zoom - ZOOM_CONTROL_SENSITIVITY, MIN_ZOOM);

      this.map.getView().setZoom(this.zoom);
    },

    onCurrentPositionButtonClick() {
      setCurrentLocation(this.map);
    },
  },
};
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  position: relative;

  &.adding-mode {
    cursor: crosshair;
  }

  #map {
    width: 100%;
    height: 100%;
  }

  .map-controls {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .add-point-container {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>

<i18n>
{
  "en": {
    "new-marker-title": "Marker #{number}"
  },
  "ru": {
    "new-marker-title": "Маркер #{number}"
  }
}
</i18n>
