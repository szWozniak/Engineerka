import { useContext } from 'react';
import useDronesLayer from './default/useDronesLayer';
import useTracesLayer from './default/useTracesLayer';
import { AppContext } from '../../context/AppContext';
import useFlightsTracesLayer from './flights/useFlightsTracesLayer';
import useTrackedDroneLayer from './flights/useTrackedDroneLayer';

const useLayerManager = () => {
    const { tableSelectedDroneRegistration, trackedFlight } = useContext(AppContext)
    
    const dronesLayer = useDronesLayer();
    const tracesLayer = useTracesLayer();
    
    const flightsTracesLayer = useFlightsTracesLayer();
    const trackedDroneLayer = useTrackedDroneLayer();

    const layers = tableSelectedDroneRegistration 
        ? (trackedFlight ? [ flightsTracesLayer, trackedDroneLayer] : [ flightsTracesLayer ])
        : [ dronesLayer, tracesLayer ]

    return { layers }
};

export default useLayerManager;