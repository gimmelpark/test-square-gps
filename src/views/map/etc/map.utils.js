import { Map, View, Feature } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Icon, Style, Circle, Stroke } from "ol/style";

import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM } from "./map.constants";

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

  // // console.log(map.getControls());
  //
  // // map.getControls().forEach()
  //
  // addListeners(map, eventListeners);

  // return map;
};

// const addListeners = (map, eventListeners = []) => {
//   eventListeners.forEach(({ eventName, listener }) => {
//     map.on(eventName, listener);
//   });
// };

export const setCurrentLocation = (map) => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const center = fromLonLat([
          position.coords.longitude,
          position.coords.latitude,
        ]);

        map.getView().setCenter(center);
        map.getView().setZoom(DEFAULT_ZOOM);

        resolve();
      });
    } else {
      reject();
    }
  });
};

export const addPoint = (map, coords, color = "#0B27E7") => {
  const feature = new Feature(new Point(coords));

  // const img = new Image(16, 16);
  // img.src = 'src/assets/map-marker.svg'

  // feature.setStyle(
  //   new Style({
  //     image: new Icon({
  //       color,
  //       img,
  //       // src: MAP_MARKER_SVG,
  //       scale: 0.2,
  //       anchor: [0.5, 1],
  //       anchorXUnits: "fraction",
  //       anchorYUnits: "fraction",
  //     }),
  //   }),
  // );

  feature.setStyle(
    new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          width: 8,
          color,
        }),
      }),
    }),
  );

  const vectorSource = map
    .getLayers()
    ?.getArray()
    ?.find((layer) => layer instanceof VectorLayer)
    ?.getSource();

  if (vectorSource) {
    vectorSource.addFeature(feature);
  }
};
