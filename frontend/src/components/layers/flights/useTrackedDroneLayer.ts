import { SimpleMeshLayer } from 'deck.gl';
import MESH_URL from '../../../map/config/model';
import { theme } from '../../../map/config/theme';
import { DroneFlight } from '../../../flights/api/types';

interface Props {
  trackedFlight: DroneFlight | null | undefined
  trackedPoint: number
}

const useTrackedDroneLayer = ({trackedFlight, trackedPoint} : Props) => {

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