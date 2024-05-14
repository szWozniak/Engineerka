import { AmbientLight, DirectionalLight, LightingEffect } from "deck.gl";

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