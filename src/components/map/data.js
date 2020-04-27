//En la tabla mantenimiento,
//el campo IntersectionID apunta al campo  InternalID
// de la tabla Ubicaciones
import locations from "./locations";
import maintenances from "./maintenances";

const BOUNDS = [
  [18.42593, -70.018579],
  [18.550654, -69.874751],
];
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
const geojsonLocations = {
  type: "FeatureCollection",
  features: locations.map((location) => ({
    type: "Feature",
    properties: {
      ...location,
      correctivo: Math.floor(getRandom(0, 20)),
      preventivo: Math.floor(getRandom(0, 20)),
      ingenieria: Math.floor(getRandom(0, 20)),
    },
    geometry: {
      type: "Point",
      coordinates: [
        getRandom(BOUNDS[0][0], BOUNDS[1][0]),
        getRandom(BOUNDS[0][1], BOUNDS[1][1]),
      ],
    },
  })),
};

export { geojsonLocations, maintenances };
