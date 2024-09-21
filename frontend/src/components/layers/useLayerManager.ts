import { useContext } from 'react';
import useDronesLayer from './default/useDronesLayer';
import useTracesLayer from './default/useTracesLayer';
import { AppContext } from '../../context/AppContext';
import useFlightsTracesLayer from './flights/useFlightsTracesLayer';

const useLayerManager = () => {
    const { tableSelectedDroneRegistration } = useContext(AppContext)
    
    const dronesLayer = useDronesLayer();
    const tracesLayer = useTracesLayer();
    
    const flightsTracesLayer = useFlightsTracesLayer();

    const layers = tableSelectedDroneRegistration 
        ? [ flightsTracesLayer ] 
        : [ dronesLayer, tracesLayer ]

    return { layers }
};

export default useLayerManager;