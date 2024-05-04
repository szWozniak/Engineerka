import { SimpleMeshLayer } from "deck.gl";
import { MapDrone } from "../../drones/types";
import MESH_URL from "../../drones/constants";
import { theme } from "../../map/configuration/mapConfiguration";

interface props{
    selectedDrone: MapDrone | null,
    isVisible: boolean
}

const specificDroneLayer = ({selectedDrone, isVisible} : props) => {

    return new SimpleMeshLayer<MapDrone>({
        id: "specific-drone",
        data: selectedDrone && [selectedDrone],
        mesh: MESH_URL,
        getPosition: d => d && d.position,
        getColor: d => d && d.color,
        getOrientation: d => d && d.orientation,
        material: theme.material,
        sizeScale: 3,
        visible: isVisible,
      })
};

export default specificDroneLayer

