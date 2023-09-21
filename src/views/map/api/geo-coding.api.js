import axios from "axios";
import { toLonLat } from "ol/proj";

export const getAddressByCoords = (coords) => {
  const [lon, lat] = toLonLat(coords);

  return axios
    .get("https://geocode.maps.co/reverse", {
      params: { lon, lat },
    })
    .then(({ data }) => {
      if (data.display_name) {
        return data.display_name;
      } else {
        throw new Error("Address not found");
      }
    })
    .catch(() => {
      throw new Error("Address not found");
    });
};
