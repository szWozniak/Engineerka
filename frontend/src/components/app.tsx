import { useEffect, useRef, useState } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import { INITIAL_VIEW_STATE, lightingEffect } from '../map/configuration/mapConfiguration';
import { MapDrone } from '../drones/types';
import useDrones from '../hooks/useDrones';
import Sidebar from './sidebar/Sidebar';
import lineLayer from './layers/demoMovingLineLayer';
import allDrones3DLayer from './layers/allDrones3DLayer';
import ViewMode from './layers/types/viewMode';

registerLoaders([OBJLoader]);

//From PUBLIC folder



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
  const [selectedDrone, setSelectedDrone] = useState<MapDrone | null>(null)
  const [CurrentView, setCurrentView] = useState<ViewMode>(ViewMode.ThreeDAll)

  useEffect(() => {
    const disableDefaultRightClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableDefaultRightClick)

    return () => document.removeEventListener("contextmenu", disableDefaultRightClick)
  }, [])



  const {drones, startSimulation} = useDrones(selectedDrone);
  const allDronesLayer = allDrones3DLayer({
    drones: drones,
    isVisible: CurrentView === ViewMode.ThreeDAll,
    onClick: setSelectedDrone
  });
  const mapRef: any = useRef();
  // useEffect(() => {
  //   if (mapRef.current) {

  //   }
  // }, [mapRef.current])

  const layers = [
    allDronesLayer,
    lineLayer
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

        // onViewStateChange={(view) => console.log(view)}
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

