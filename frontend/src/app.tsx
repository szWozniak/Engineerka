import { useEffect, useRef, useState } from 'react';
//DeckGL
import DeckGL from '@deck.gl/react';
//Map
import Map from 'react-map-gl';
//Loaders
import { OBJLoader } from '@loaders.gl/obj';
import { registerLoaders } from '@loaders.gl/core';

import Sidebar from './components/sidebar/Sidebar';
import useLayerManager from './components/layers/useLayerManager';
import BottomMenu from './components/bottomMenu/BottomMenu';
import { INITIAL_VIEW_STATE } from './map/config/initialView';
import './i18n';
import { lightingEffect } from './map/config/effects';
import useMapState from './map/useCases/useMap';
import useDroneFilters from './filters/drone/useCases/useDroneFilters';

registerLoaders([OBJLoader]);


const App = () => {
  const mapRef: any = useRef();
  const { layers } = useLayerManager()

  const {mapViewState, setMapViewState, getTooltip} = useMapState();

  const [areFiltersOpened, setAreFiltersOpened] = useState<boolean>(false)

  useEffect(() => {
    const disableDefaultRightClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableDefaultRightClick)

    return () => document.removeEventListener("contextmenu", disableDefaultRightClick)
  }, [])

  return (
    <div>
      <div className="overlay">
        <Sidebar 
          areFiltersOpened={areFiltersOpened}
          toggleFiltersVisibility={() => setAreFiltersOpened(prev => !prev)}
        />
        <BottomMenu 
          areFiltersOpen={areFiltersOpened}
          closeFilters={() => setAreFiltersOpened(false)}
        />
      </div>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
        viewState={mapViewState}
        onViewStateChange={(newMapViewState) => {
          setMapViewState(newMapViewState.viewState)
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