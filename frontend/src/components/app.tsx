import { useRef } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { LineLayer } from '@deck.gl/layers';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import {PickingInfo} from "deck.gl"
import { INITIAL_VIEW_STATE, lightingEffect, theme } from '../map/configuration/mapConfiguration';
import { paths } from '../map/configuration/pathConfiguration';
import { MapDrone } from '../drones/types';
import useDrones from '../hooks/useDrones';
import Sidebar from './sidebar/Sidebar';

registerLoaders([OBJLoader]);

//From PUBLIC folder
const MESH_URL = 'assets/drone.obj';


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
  const mapRef: any = useRef();

  const {drones, setSelectedDrone, selectedDrone, startSimulation} = useDrones();

  const handleMouseClick = (info: PickingInfo, _event: any) => {
    if (info && info.object) {
      const drone = drones.find(d => d.id === info.object.id)
      if (drone) {
        setSelectedDrone(drone)
      }
    }
  }

  // useEffect(() => {
  //   if (mapRef.current) {

  //   }
  // }, [mapRef.current])

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
      sizeScale: 3,
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
        onUpdateClick={startSimulation}
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

