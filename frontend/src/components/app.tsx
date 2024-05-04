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
import specificDroneLayer from './layers/specificDroneLayer';
import allDronesTraceLayer from './layers/allDronesTraceLayer';

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
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.ThreeDAll)

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
    isVisible: currentView === ViewMode.ThreeDAll,
    onClick: setSelectedDrone
  });

  const oneDroneLayer = specificDroneLayer({ //to change name
    selectedDrone: selectedDrone,
    isVisible: currentView === ViewMode.Specific
  })

  const droneTraces = allDronesTraceLayer({
    isVisible: currentView === ViewMode.ThreeDAll
  });

  const mapRef: any = useRef();
  // useEffect(() => {
  //   if (mapRef.current) {

  //   }
  // }, [mapRef.current])

  const layers = [
    allDronesLayer,
    lineLayer, 
    oneDroneLayer,
    droneTraces
  ];

  return (
    <div>
      <Sidebar
        onDebugClick={() => {
          console.log(mapRef.current)
        }}
        onUpdateClick={startSimulation}
        selectedDrone={selectedDrone}
        currentView={currentView}
        changeCurrentView={(view) => setCurrentView(view)}
      />
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
        // onViewStateChange={(view) => ({
        //   ...view.viewState,
        //   pitch: 0
        // })}
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

