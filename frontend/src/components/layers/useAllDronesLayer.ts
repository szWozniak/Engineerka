import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import React, { useContext } from 'react';
import { Drone, MapDrone } from '../../drones/types';
import MESH_URL, { DEFAULT_COLOR, SELECTED_COLOR } from '../../mapConfig/model';
import { theme } from '../../mapConfig/theme';
import { AppContext } from '../../context/AppContext';


interface props {
  isVisible: boolean
}

const useAllDronesLayer = ({ isVisible }: props) => {
  const { drones, selectedDrone, setSelectedDroneId } = useContext(AppContext)

  const handleMouseClick = (info: PickingInfo, _event: any) => {
    if (info && info.object) {
      setSelectedDroneId(info?.object?.identification)
    }
  }

  return new SimpleMeshLayer<MapDrone>({
    id: "default-drones",
    data: drones?.map(
      d => ({ ...d, color: d.registrationNumber === selectedDrone?.registrationNumber ? SELECTED_COLOR : DEFAULT_COLOR })
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
  })
};

export default useAllDronesLayer;