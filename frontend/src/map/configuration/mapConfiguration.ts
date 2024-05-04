import { AmbientLight, DirectionalLight, LightingEffect } from "deck.gl";

const material = {
    ambient: 0.9,
    diffuse: 0.6,
    shininess: 64,
    specularColor: [60, 64, 70]
};

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 0.6
  });
  
  const dirLight = new DirectionalLight({
    color: [255, 255, 255],
    intensity: 0.8,
    direction: [-10, -2, -15]
  });
  
export const lightingEffect = new LightingEffect({ ambientLight, dirLight });

export const theme: any = {
    buildingColor: [160, 170, 180],
    trailColor0: [253, 128, 93],
    trailColor1: [23, 184, 190],
    material,
    effects: [lightingEffect]
  };

export const INITIAL_VIEW_STATE = {
    latitude: 50.0637,
    longitude: 19.9050,
    zoom: 15,
    maxZoom: 20,
    bearing: 30
  };