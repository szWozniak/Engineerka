import React from 'react';
import { createRoot } from 'react-dom/client';
import DeckGL from '@deck.gl/react';

import GL from '@luma.gl/constants';

import {
  COORDINATE_SYSTEM,
  OrbitView,
  DirectionalLight,
  LightingEffect,
  AmbientLight
} from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';

import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';


import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

// Add the loaders that handle your mesh format here
registerLoaders([OBJLoader]);

const MESH_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/mesh/minicooper.obj';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  latitude: 40.7,
  longitude: -74,
  zoom: 12,
  maxZoom: 16,
  pitch: 50,
  bearing: 0
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const dirLight = new DirectionalLight({
  color: [255, 255, 255],
  intensity: 1.0,
  direction: [-10, -2, -15]
});

const lightingEffect = new LightingEffect({});

export default function App() {
  const layers = [
    new SimpleMeshLayer({
      id: 'mini-coopers',
      data: [
        {
          position: [-73.981, 40.731],
          color: [255, 0, 0],
          orientation: [0, 0, 0]
        }
      ],
      mesh: MESH_URL,
      getPosition: d => d.position,
      getColor: d => d.color,
      getOrientation: d => d.orientation
    })
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      pickingRadius={5}
      effects={[lightingEffect]}
      parameters={{
        blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
        blendEquation: GL.FUNC_ADD
      }}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export function renderToDOM(container) {
  createRoot(container).render(<App />);
}
