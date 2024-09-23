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

    const layers = tableSelectedDroneRegistration 
        ? (trackedFlight ? [ flightsTracesLayer, trackedDroneLayer] : [ flightsTracesLayer ])
        : [ dronesLayer, tracesLayer ]

    return { layers }
};

export default useLayerManager;