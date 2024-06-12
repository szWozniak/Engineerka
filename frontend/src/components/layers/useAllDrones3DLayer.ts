import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import React from 'react';
import { Drone, MapDrone } from '../../drones/types';
import MESH_URL, { DEFAULT_COLOR, SELECTED_COLOR } from '../../mapConfig/model';
import { theme } from '../../mapConfig/theme';


interface props{
  onClick: React.Dispatch<React.SetStateAction<string | null>>, 
  drones: Drone[] | undefined,
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
        getPosition: d => [d.currentPosition.longitude, d.currentPosition.latitude, d.currentPosition.altitude],
        getColor: d => d.color,
        getOrientation: d => [0, d.heading, 90],
        material: theme.material,
        sizeScale: 2,
        pickable: true,
        visible: isVisible,
        onClick: handleMouseClick,
        transitions:{
          getPosition: {
            duration: 3000,
          },
        }
      })
};

export default useAllDrones3DLayer;