import { SimpleMeshLayer } from "deck.gl";
import { MapDrone } from "../../drones/types";
import MESH_URL from "../../mapConfig/model";
import { theme } from "../../mapConfig/theme";

interface props{
    selectedDrone: MapDrone | null,
    isVisible: boolean
}

const specificDroneLayer = ({selectedDrone, isVisible} : props) => {

    return new SimpleMeshLayer<MapDrone>({
        id: "specific-drone",
        data: selectedDrone && [selectedDrone],
        mesh: MESH_URL,
        getPosition: d => [d.longitude, d.latitude, d.altitude],
        getColor: d => d.color,
        getOrientation: d => [0, d.heading, 90],
        material: theme.material,
        sizeScale: 3,
        visible: isVisible,
      })
};

export default specificDroneLayer