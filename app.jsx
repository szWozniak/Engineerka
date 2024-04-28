import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import DeckGL from '@deck.gl/react';

import {
  COORDINATE_SYSTEM,
  OrbitView,
  DirectionalLight,
  LightingEffect,
  AmbientLight
} from '@deck.gl/core';
import { PolygonLayer, LineLayer, GeoJsonLayer } from '@deck.gl/layers';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';

import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';


import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

// Add the loaders that handle your mesh format here
registerLoaders([OBJLoader]);

//const MESH_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/mesh/minicooper.obj';
const MESH_URL = '/drone.obj';

const BUILDINGS =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json'

//const MAP_STYLE = '	https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  latitude: 50.0637,
  longitude: 19.9050,
  zoom: 15,
  maxZoom: 20,
  pitch: 100,
  bearing: 30
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

const paths = generatePath([19.92, 50.0592], [19.9, 50.0671], Array.from({ length: 200 }, (_, index) => Math.round(200 * Math.pow(0.3, index / 100) + 20)))

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
  const [currentPosition, setCurrentPosition] = useState(0)
  const [selectedDrone, setSelectedDrone] = useState(null)
  const intervalRef = useRef();
  const mapRef = useRef();

  const [drones, setDrones] = useState([
    {
      id: 1,
      position: [19.9317, 50.0671, 50],
      orientation: [0, 130, 90]
    },
    {
      id: 2,
      position: [19.9276, 50.0685, 60],
      orientation: [0, 180, 90],
    },
    {
      id: 3,
      position: [19.9207, 50.0712, 40],
      orientation: [30, 150, 90],
    }
  ])

  const handleMouseClick = (info, event) => { 
    if (info && info.object){
      console.log(info.object)
      const drone = drones.find(d => d.id === info.object.id)
      console.log(drone)
      setSelectedDrone(drone)
    }
  }

  useEffect(() => {
    if (mapRef.current) {

    }
  }, [mapRef.current])

  useEffect(() => {
    if (!selectedDrone?.id) return
    setDrones([
      ...drones.filter((drone) => drone.id !== selectedDrone.id),
      {
        id: selectedDrone.id,
        position: paths[currentPosition].start,
        orientation: selectedDrone.orientation
      }
    ])
  }, [currentPosition])

  const updateDrone = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPosition(prev => (prev + 1) % 199)
    }, 15)
  }

  const layers = [
    //https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer
    new SimpleMeshLayer({
      // id: `drone-${drone.id}`,
      data: drones.map((drone) => {
        return {...drone,
        color: drone === selectedDrone ? [255, 0, 0] : [215, 80, 80]}
      }),
      mesh: MESH_URL,
      getPosition: d => d.position,
      getColor: d => d.color,
      getOrientation: d => d.orientation,
      material: theme.material,
      sizeScale: 0.05,
      pickable: true,
      onClick: handleMouseClick
      
    }),
    new LineLayer({
      id: 'flight-paths',
      data: paths,
      opacity: 0.8,
      getSourcePosition: d => d.start,
      getTargetPosition: d => d.end,
      getColor: d => [0, 200, 200, 125],
      getWidth: d => 5,
      pickable: false
    })
  ];

  return (
    <div>
      <div className="panel">
        <h3>Map options</h3>
        <button onClick={() => {
          console.log(mapRef.current)
        }}>
          Map debug
        </button>
        {selectedDrone && <div>
          <h2>Selected drone: {selectedDrone.id}</h2>
          <h3>Position</h3>
          Latitude: {selectedDrone.position[0]}<br />
          Longtitude: {selectedDrone.position[1]}<br />
          <h3>Orientation</h3>
          Direction: {selectedDrone.orientation[1]}<br />
          Slope: {selectedDrone.orientation[2]}<br />
          <h3>Drone management</h3>
          <button onClick={() => updateDrone(selectedDrone)}>Update location</button>
        </div>}
      </div>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
        // onClick={handleMouseClick}
        // pickObject={() => console.log("dupa")}
      >
        <Map
          reuseMaps={true}
          ref={mapRef}

          onLoad={() => {
            console.log("Map loaded")
          }}
          maxPitch={85}
          //mapStyle={MAP_STYLE}
          mapStyle={"mapbox://styles/mapbox/dark-v11"}
          preventStyleDiffing={true}
          mapboxAccessToken={"pk.eyJ1Ijoic3p3b3puaWFrIiwiYSI6ImNsdWg1dXFtdzFxYW0yanBrZGZ4Mm8yd2MifQ.LPRSA5OB7Zts77Zpt9GsDw"}
        >
        </Map>
      </DeckGL>
    </div>
  );
}

export function renderToDOM(container) {
  createRoot(container).render(<App />);
}
