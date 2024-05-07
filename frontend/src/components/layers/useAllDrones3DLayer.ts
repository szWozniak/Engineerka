import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import React from 'react';
import { theme } from '../../map/configuration/mapConfiguration';
import { Drones, MapDrone } from '../../drones/types';
import MESH_URL from '../../drones/constants';
import { DEFAULT_COLOR, SELECTED_COLOR } from './constants';

interface props{
  onClick: React.Dispatch<React.SetStateAction<string | null>>, 
  drones: Drones[] | undefined,
  isVisible: boolean
  selectedDrone: string | null
}

const useAllDrones3DLayer = ({onClick, drones, isVisible, selectedDrone} : props) => {

    const handleMouseClick = (info: PickingInfo, _event: any) => {

        if (info && info.object) {
            console.log(info.object.registrationNumber)
            onClick(info.object.registrationNumber)
        }
      }
    
    return new SimpleMeshLayer<MapDrone>({
        id: "default-drones",
        data: drones?.map(
          d => ({...d, color: d.registrationNumber === selectedDrone ? SELECTED_COLOR : DEFAULT_COLOR})
        ),
        mesh: MESH_URL,
        getPosition: d => [d.longitude, d.latitude, d.altitude],
        getColor: d => d.color,
        getOrientation: d => [0, d.heading, 90],
        material: theme.material,
        sizeScale: 2,
        pickable: true,
        visible: isVisible,
        onClick: handleMouseClick
      })
};

export default useAllDrones3DLayer;