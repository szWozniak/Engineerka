import { PickingInfo, SimpleMeshLayer } from 'deck.gl';
import { MapDrone } from '../../../drones/types';
import useDrones from '../../../drones/useCases/useDrones';
import MESH_URL, { DEFAULT_COLOR, SELECTED_COLOR } from '../../../map/config/model';
import { theme } from '../../../map/config/theme';

const useDronesLayer = () => {
  const { flyingDrones, selectDrone, selectedDrone } = useDrones();

  const handleMouseClick = (info: PickingInfo, _event: any) => {
    if (info && info.object) {
      selectDrone(info?.object?.registrationNumber)
    }
  }

  return new SimpleMeshLayer<MapDrone>({
    id: "default-drones",
    data: flyingDrones?.map(
      d => ({ ...d, color: d.registrationNumber === selectedDrone?.registrationNumber ? SELECTED_COLOR : DEFAULT_COLOR })
    ),
    mesh: MESH_URL,
    getPosition: d => [d.currentPosition.longitude, d.currentPosition.latitude, d.currentPosition.altitude],
    getColor: d => d.color,
    getOrientation: d => [0, d.heading, 90],
    material: theme.material,
    sizeScale: 10,
    pickable: true,
    visible: true,
    onClick: handleMouseClick,
  })
};

export default useDronesLayer;