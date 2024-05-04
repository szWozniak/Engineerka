import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import React from 'react';
import { theme } from '../../map/configuration/mapConfiguration';
import { MapDrone } from '../../drones/types';
import MESH_URL from '../../drones/constants';

interface props{
  onClick: React.Dispatch<React.SetStateAction<MapDrone | null>>, 
  drones: MapDrone[],
  isVisible: boolean
}

const allDrones3DLayer = ({onClick, drones, isVisible} : props) => {
    const handleMouseClick = (info: PickingInfo, _event: any) => {
        if (info && info.object) {
          const drone = drones.find(d => d.id === info.object.id)
          if (drone) {
            onClick(drone)
          }
        }
      }
    
    return new SimpleMeshLayer<MapDrone>({
        id: "default-drones",
        data: drones,
        mesh: MESH_URL,
        getPosition: d => d.position,
        getColor: d => d.color,
        getOrientation: d => d.orientation,
        material: theme.material,
        sizeScale: 2,
        pickable: true,
        visible: isVisible,
        onClick: handleMouseClick
      })
};

export default allDrones3DLayer;