import { Map, View, Feature } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Style, Circle, Stroke } from "ol/style";
import { Select } from "ol/interaction";

import {
  DEFAULT_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
  DEFAULT_POINT_COLOR,
  ACTIVE_POINT_COLOR,
} from "./map.constants";

export const createMap = () => {
  return new Map({
    controls: [],
    target: "map",
    layers: [
      new TileLayer({ source: new OSM() }),
      new VectorLayer({
        source: new VectorSource(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: DEFAULT_ZOOM,
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
    }),
  });
};

export const addClickInteraction = (map) => {
  const select = new Select({
    style: getFeatureStyle(ACTIVE_POINT_COLOR),
  });

  map.addInteraction(select);

  return select;
};

export const setViewLocation = (map, coords) => {
  map.getView().setCenter(coords);
};

export const setCurrentLocation = (map) => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const center = fromLonLat([
          position.coords.longitude,
          position.coords.latitude,
        ]);

        setViewLocation(map, center);
        map.getView().setZoom(DEFAULT_ZOOM);

        resolve();
      });
    } else {
      reject();
    }
  });
};

export const selectFeatureById = (interaction, id) => {
  const feature = getVectorSource(interaction.getMap())
    ?.getFeatures()
    ?.find((feature) => feature.getId() === id);

  interaction.getFeatures().clear();

  if (feature) {
    interaction.getFeatures().push(feature);
  }
};

const getVectorSource = (map) => {
  return map
    .getLayers()
    ?.getArray()
    ?.find((layer) => layer instanceof VectorLayer)
    ?.getSource();
};

const getFeatureStyle = (color = DEFAULT_POINT_COLOR) => {
  return new Style({
    image: new Circle({
      radius: 8,
      stroke: new Stroke({
        width: 8,
        color,
      }),
    }),
  });
};

const getFeatureByPoint = ({ coords, id }) => {
  const feature = new Feature(new Point(coords));

  feature.setId(id);

  feature.setStyle(getFeatureStyle());

  return feature;
};

export const updateMapPoints = (map, pointsList = []) => {
  const vectorSource = getVectorSource(map);
  const features = vectorSource?.getFeatures();

  if (!features) {
    return;
  }

  const pointListIds = pointsList.map(({ id }) => id);
  const addedFeaturesIds = features.map((feature) => feature.getId());

  const featuresToRemove = features.filter(
    (feature) => !pointListIds.includes(feature.getId()),
  );
  const pointsToAdd = pointsList.filter(
    (point) => !addedFeaturesIds.includes(point.id),
  );

  featuresToRemove.forEach((feature) => {
    vectorSource.removeFeature(feature);
  });

  pointsToAdd.forEach((point) => {
    vectorSource.addFeature(getFeatureByPoint(point));
  });
};
