import React, { useRef, useState, useEffect } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
import {
  DirectionalLight,
  LightingEffect,
  AmbientLight
} from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { LineLayer } from '@deck.gl/layers';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';
import useDrones, { MapDrone } from '../hooks/useDrones';

import {Color, PickingInfo} from "deck.gl"
import Sidebar from './Sidebar';

registerLoaders([OBJLoader]);

//From PUBLIC folder
const MESH_URL = 'assets/dronik.obj';

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

const generatePath = (start: any, end: any, heights: any) => {
  const num = heights?.length
  const distanceX = ((end[0] - start[0]) / (num - 1))
  const distanceY = (end[1] - start[1]) / (num - 1)

  return heights.slice(0, num - 1).map((_: any, index: any) => ({
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

const theme: any = {
  buildingColor: [160, 170, 180],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

function getTooltip({ object }: any) {
  return (
    object &&
    `\
  Drone Information\n
  Drone ID: ${object?.id}\n
  Position: ${object?.position}
  `
  );
}

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef: any = useRef();

  const {drones, setSelectedDrone, selectedDrone} = useDrones();

  const handleMouseClick = (info: PickingInfo, _event: any) => {
    if (info && info.object) {
      const drone = drones.find(d => d.id === info.object.id)
      if (drone){
        setSelectedDrone(drone)
      }
    }
  }

  // useEffect(() => {
  //   if (mapRef.current) {

  //   }
  // }, [mapRef.current])

  // useEffect(() => {
  //   if (!selectedDrone?.id) return
  //   setDrones([
  //     ...drones.filter((drone: any) => drone.id !== selectedDrone.id),
  //     {
  //       id: selectedDrone.id,
  //       position: paths[currentPosition].start,
  //       orientation: selectedDrone.orientation
  //     }
  //   ])
  // }, [currentPosition])

  const updateDrone = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPosition((prev: number) => (prev + 1) % 199)
    }, 15)
  }

  const layers = [
    //https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer
    new SimpleMeshLayer<MapDrone>({
      id: "default-drones",
      data: drones,
      mesh: MESH_URL,
      getPosition: d => d.position,
      getColor: d => d.color,
      getOrientation: d => d.orientation,
      material: theme.material,
      sizeScale: 1,
      pickable: true,
      onClick: handleMouseClick
    }),
    new LineLayer({
      id: 'flight-paths',
      data: paths,
      opacity: 0.8,
      getSourcePosition: d => d.start,
      getTargetPosition: d => d.end,
      getColor: _d => [0, 200, 200, 125],
      getWidth: _d => 5,
      pickable: false
    })
  ];

  

  return (
    <div>
      <Sidebar
        onDebugClick={() => {
          console.log(mapRef.current)
        }}
        onUpdateClick={updateDrone}
        selectedDrone={selectedDrone}
      />
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
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
          mapboxAccessToken={"pk.eyJ1Ijoic3p3b3puaWFrIiwiYSI6ImNsdWg1dXFtdzFxYW0yanBrZGZ4Mm8yd2MifQ.LPRSA5OB7Zts77Zpt9GsDw"}
        >
        </Map>
      </DeckGL>
    </div>
  );
}

export default App;

