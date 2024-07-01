import { useContext, useEffect } from 'react';
import { SimpleMeshLayer } from "deck.gl";
import { Drone, MapDrone } from "../../drones/types";
import MESH_URL from "../../mapConfig/model";
import { theme } from "../../mapConfig/theme";
import { AppContext } from '../../context/AppContext';

interface props {
    isVisible: boolean
}

const useSpecificDroneLayer = ({ isVisible }: props) => {
    const { drones, selectedDrone } = useContext(AppContext)

    const drone: MapDrone = {
        ...(selectedDrone as Drone),
        color: [255, 50, 50]
    }

    return new SimpleMeshLayer<MapDrone>({
        id: "specific-drone",
        data: drone ? [drone] : [],
        mesh: MESH_URL,
        getPosition: d => [d.currentPosition.longitude, d.currentPosition.latitude, d.currentPosition.altitude],
        getColor: d => d.color,
        getOrientation: d => [0, d.heading, 90],
        material: theme.material,
        sizeScale: 3,
        visible: isVisible,
    })
};

export default useSpecificDroneLayer