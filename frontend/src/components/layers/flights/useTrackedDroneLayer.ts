import { SimpleMeshLayer } from 'deck.gl';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import MESH_URL from '../../../map/config/model';
import { theme } from '../../../map/config/theme';

const useTrackedDroneLayer = () => {
  const { flights } = useContext(AppContext)

  return new SimpleMeshLayer({
    id: "tracked-drone",
    data: [flights.trackedFlight?.flightRecords?.[flights.trackedPoint]],
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