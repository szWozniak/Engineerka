import React, { useState, useEffect } from 'react';
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
import { PolygonLayer, LineLayer } from '@deck.gl/layers';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';

import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';


import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

// Add the loaders that handle your mesh format here
registerLoaders([OBJLoader]);

const MESH_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/mesh/minicooper.obj';
const BUILDINGS =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json'

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
  intensity: 0.6
});

const dirLight = new DirectionalLight({
  color: [255, 255, 255],
  intensity: 0.8,
  direction: [-10, -2, -15]
});

const lightingEffect = new LightingEffect({ ambientLight, dirLight });

const generatePath = (start, end, heights) => {
  const num = heights?.length
  const distanceX = ((end[0] - start[0]) / (num - 1))
  const distanceY = (end[1] - start[1]) / (num - 1)

  return heights.slice(0, num - 1).map((_, index) => ({
    start: [start[0] + distanceX * index, start[1] + distanceY * index, heights[index]],
    end: [start[0] + distanceX * (index + 1), start[1] + distanceY * (index + 1), heights[index + 1]],
  }))
}

const paths = generatePath([-73.97380, 40.78510], [-73.98100, 40.73100], [130, 900, 600, 500, 500, 500, 400, 300, 200, 200, 180])

const material = {
  ambient: 0.9,
  diffuse: 0.6,
  shininess: 64,
  specularColor: [60, 64, 70]
};

const theme = {
  buildingColor: [160, 170, 180],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

function getTooltip({ object }) {
  return (
    object &&
    `\
  Drone Information\n
  Drone ID: ${object?.id}\n
  Position: ${object?.position}
  `
  );
}

export default function App() {
  const [selectedDrone, setSelectedDrone] = useState(null)
  const [drones, setDrones] = useState([
    {
      id: 1,
      position: [-73.981, 40.731, 150],
      orientation: [0, -5, 20]
    },
    {
      id: 2,
      position: [-73.991, 40.731, 200],
      orientation: [0, -40, 0],
    },
    {
      id: 3,
      position: [-74, 40.75, 400],
      orientation: [0, -80, -10],
    }
  ])

  const layers = [
    //https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer
    ...drones.map((drone) => new SimpleMeshLayer({
      id: `drone-${drone.id}`,
      data: [
        {
          ...drone,
          color: drone?.id === selectedDrone?.id ? [255, 0, 0] : [215, 80, 80],
        }
      ],
      mesh: MESH_URL,
      getPosition: d => d.position,
      getColor: d => d.color,
      getOrientation: d => d.orientation,
      material: theme.material,
      pickable: true,
      onClick: () => {
        console.log(`Clicked on drone: ${drone.id}`)
        setSelectedDrone(drone)
      }
    })),
    new LineLayer({
      id: 'flight-paths',
      data: paths,
      opacity: 0.8,
      getSourcePosition: d => d.start,
      getTargetPosition: d => d.end,
      getColor: d => [255, 0, 0, 155],
      getWidth: d => 5,
      pickable: false
    }),
    new PolygonLayer({
      id: 'buildings',
      data: BUILDINGS,
      extruded: true,
      wireframe: false,
      opacity: 1,
      getPolygon: f => f.polygon,
      getElevation: f => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material
    }),
  ];

  return (
    <div>
      <div className="panel">
        {selectedDrone && <div>
          <h2>Selected drone: {selectedDrone.id}</h2>
          <h3>Position</h3>
          Latitude: {selectedDrone.position[0]}<br />
          Longtitude: {selectedDrone.position[1]}<br />
          <h3>Orientation</h3>
          Direction: {selectedDrone.orientation[1]}<br />
          Slope: {selectedDrone.orientation[2]}<br />
        </div>}
      </div>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
      >
        <Map reuseMaps mapLib={maplibregl} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
      </DeckGL>
    </div>
  );
}

export function renderToDOM(container) {
  createRoot(container).render(<App />);
}
