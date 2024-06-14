import { useEffect, useRef, useState } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import Sidebar from './components/sidebar/Sidebar';
import ViewMode from './types/viewMode';
import useLayerManager from './components/layers/useLayerManager';
import { lightingEffect } from './mapConfig/effects';
import { INITIAL_VIEW_STATE } from './mapConfig/initialView';



registerLoaders([OBJLoader]);



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
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.Default)

  useEffect(() => {
    const disableDefaultRightClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableDefaultRightClick)

    return () => document.removeEventListener("contextmenu", disableDefaultRightClick)
  }, [])

  const {layers, getSelectedDrone} = useLayerManager(currentView, )
  
  const mapRef: any = useRef();
  // useEffect(() => {
  //   if (mapRef.current) {

  //   }
  // }, [mapRef.current])

  return (
    <div>
      <Sidebar
        onDebugClick={() => {
          console.log(mapRef.current)
        }}
        // onUpdateClick={startSimulation}
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

