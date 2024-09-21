import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import React, { useContext } from 'react';
import { Drone, MapDrone } from '../../../drones/types';
import MESH_URL, { DEFAULT_COLOR, SELECTED_COLOR } from '../../../mapConfig/model';
import { theme } from '../../../mapConfig/theme';
import { AppContext } from '../../../context/AppContext';

const useTrackedDroneLayer = () => {
  const { trackedFlight, trackedPoint } = useContext(AppContext)

  return new SimpleMeshLayer({
    id: "tracked-drone",
    data: [trackedFlight?.flightRecords?.[trackedPoint]],
    mesh: MESH_URL,
    getPosition: d => [d.longitude, d.latitude, d.altitude],
    getColor: d => [255, 50, 50],
    getOrientation: d => [0, d.heading, 90],
    material: theme.material,
    sizeScale: 2,
    pickable: true,
    visible: true,
  })
};

export default useTrackedDroneLayer;