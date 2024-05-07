import { lightingEffect } from "./effects";

const material = {
    ambient: 0.9,
    diffuse: 0.6,
    shininess: 64,
    specularColor: [60, 64, 70]
};

export const theme: any = {
    buildingColor: [160, 170, 180],
    trailColor0: [253, 128, 93],
    trailColor1: [23, 184, 190],
    material,
    effects: [lightingEffect]
  };