<template>
  <div class="map-container" :class="{ 'adding-mode': isAddingMode }">
    <div ref="map" id="map" />

    <div class="map-controls">
      <VBtn
        fab
        tile
        small
        :disabled="disableZoomPlusButton"
        @click="onZoomClick(true)"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>

      <VBtn
        class="mt-2"
        fab
        tile
        small
        :disabled="disableZoomMinusButton"
        @click="onZoomClick(false)"
      >
        <VIcon>mdi-minus</VIcon>
      </VBtn>

      <VBtn class="mt-2" icon small @click="centerOnCurrentPosition">
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

import {
  addClickInteraction,
  createMap,
  selectFeatureById,
  setCurrentLocation,
  setViewLocation,
  updateMapPoints,
} from "../etc/map.utils";
import {
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_CONTROL_SENSITIVITY,
} from "../etc/map.constants";

export default {
  props: {
    selectedPointId: {
      type: Number,
      default: undefined,
    },
  },

  data: () => ({
    map: undefined,
    interaction: undefined,
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

    disableZoomPlusButton() {
      return this.zoom >= MAX_ZOOM;
    },

    disableZoomMinusButton() {
      return this.zoom <= MIN_ZOOM;
    },
  },

  watch: {
    mapPoints(points) {
      updateMapPoints(this.map, points);
    },

    selectedPointId(pointId) {
      this.selectAndCenterOnFeature(pointId);
    },

    isAddingMode(value) {
      this.interaction.setActive(!value);
    },
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      this.map = createMap();

      this.interaction = addClickInteraction(this.map);

      this.interaction.on("select", this.onPointSelect);

      this.map.on("click", this.onMapClick);
      this.map.on("pointermove", this.onMapPointerMove);

      this.map
        .getView()
        .on("change:resolution", debounce(this.onResolutionUpdate, 100));

      this.zoom = this.map.getView().getZoom();
    },

    onMapClick(event) {
      if (this.isAddingMode && !this.isLoading) {
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

    onMapPointerMove(event) {
      const isCursorPointer =
        !this.isAddingMode && this.map.hasFeatureAtPixel(event.pixel);

      this.$refs.map.style.cursor = isCursorPointer ? "pointer" : "";
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

    onPointSelect(event) {
      const selectedId = event.selected?.[0]?.getId();

      this.$emit("update-selected-point", selectedId);
    },

    centerOnCurrentPosition() {
      setCurrentLocation(this.map);
    },

    centerOnPointById(pointId) {
      const point = this.mapPoints.find(({ id }) => id === pointId);

      if (point?.coords) {
        setViewLocation(this.map, point.coords);
      }
    },

    selectAndCenterOnFeature(pointId) {
      this.centerOnPointById(pointId);
      selectFeatureById(this.interaction, pointId);
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
