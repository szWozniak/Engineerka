import { useEffect, useRef, useState } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import { INITIAL_VIEW_STATE, lightingEffect, theme } from '../map/configuration/mapConfiguration';
import { Drones, MapDrone } from '../drones/types';
import useDrones from '../hooks/useDrones';
import Sidebar from './sidebar/Sidebar';
import lineLayer from './layers/demoMovingLineLayer';
import useAllDrones3DLayer from './layers/useAllDrones3DLayer';
import ViewMode from './layers/types/viewMode';
import specificDroneLayer from './layers/specificDroneLayer';
import allDronesTraceLayer from './layers/allDronesTraceLayer';
import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import MESH_URL from '../drones/constants';
import { DEFAULT_COLOR, SELECTED_COLOR } from './layers/constants';

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
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.ThreeDAll)

  useEffect(() => {
    const disableDefaultRightClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableDefaultRightClick)

    return () => document.removeEventListener("contextmenu", disableDefaultRightClick)
  }, [])



  const {drones, testDrones} = useDrones(currentView === ViewMode.ThreeDAll);
  
  const allDronesLayer = useAllDrones3DLayer({
    drones: testDrones,
    isVisible: currentView === ViewMode.ThreeDAll,
    onClick: setSelectedDrone,
    selectedDrone: selectedDrone
  });

  // const oneDroneLayer = specificDroneLayer({ //to change name
  //   selectedDrone: selectedDrone,
  //   isVisible: currentView === ViewMode.Specific
  // })

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
    // oneDroneLayer,
    droneTraces
  ];

  const getSelectedDrone = () => {
    if (testDrones === undefined) return undefined
    return testDrones.find(d => d.registrationNumber === selectedDrone)
  }

  return (
    <div>
      <Sidebar
        onDebugClick={() => {
          console.log(mapRef.current)
        }}
        // onUpdateClick={startSimulation}
        onUpdateClick={() => {}}
        selectedDrone={getSelectedDrone()}
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

