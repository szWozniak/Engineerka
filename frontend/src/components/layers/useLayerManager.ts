import { useContext } from 'react';
import useDronesLayer from './default/useDronesLayer';
import useDronesTracesLayer from './default/useDronesTracesLayer';
import { AppContext } from '../../context/AppContext';
import useFlightsTracesLayer from './flights/useFlightsTracesLayer';
import useTrackedDroneLayer from './flights/useTrackedDroneLayer';

const useLayerManager = () => {
    const { tableSelectedDroneRegistration, trackedFlight } = useContext(AppContext)
    
    const dronesLayer = useDronesLayer();
    const tracesLayer = useDronesTracesLayer();
    
    const flightsTracesLayer = useFlightsTracesLayer();
    const trackedDroneLayer = useTrackedDroneLayer();

    if(tableSelectedDroneRegistration) {
        if(trackedFlight) {
            return { layers: [ flightsTracesLayer, trackedDroneLayer] }
        }
        
        return { layers: [ flightsTracesLayer ] }
    }

    return { layers: [ dronesLayer, tracesLayer ] }
};

export default useLayerManager;