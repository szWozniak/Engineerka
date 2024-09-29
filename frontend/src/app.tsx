import { useContext, useEffect, useRef, useState } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import Sidebar from './components/sidebar/Sidebar';
import useLayerManager from './components/layers/useLayerManager';
import { lightingEffect } from './mapConfig/effects';
import BottomMenu from './components/bottomMenu/BottomMenu';
import { AppContext } from './context/AppContext';
import { INITIAL_VIEW_STATE } from './mapConfig/initialView';
import useFilters from './filters/useCases/useFilters';

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
  const mapRef: any = useRef();
  const { layers } = useLayerManager()

  const { map } = useContext(AppContext)

  useEffect(() => {
    const disableDefaultRightClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableDefaultRightClick)

    return () => document.removeEventListener("contextmenu", disableDefaultRightClick)
  }, [])

  const {applyFilters, filters, numberFilters, textFilters, visibility} = useFilters();

  return (
    <div>
      <div className="overlay">
        <Sidebar 
          toggleFiltersVisibility={visibility.toggleVisibility}
        />
        <BottomMenu 
          areFiltersOpen={visibility.areOpen}
          applyFilters={applyFilters}
          getNumberFilter={numberFilters.get}
          getTextFilter={textFilters.get}
          onNumberFilterChange={numberFilters.onChange}
          onTextFilterChange={textFilters.onChange}
        />
      </div>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
        viewState={map.viewState}
        onViewStateChange={(newMapViewState) => {
          map.setViewState(newMapViewState.viewState)
        }}
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