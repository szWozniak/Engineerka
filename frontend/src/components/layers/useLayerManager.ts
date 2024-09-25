import { useContext } from 'react';
import useDronesLayer from './default/useDronesLayer';
import useDronesTracesLayer from './default/useDronesTracesLayer';
import { AppContext } from '../../context/AppContext';
import useFlightsTracesLayer from './flights/useFlightsTracesLayer';
import useTrackedDroneLayer from './flights/useTrackedDroneLayer';
import { Layer, LineLayer } from 'deck.gl';

const useLayerManager = () => {
    const { tableSelectedDroneRegistration, trackedFlight } = useContext(AppContext)
    
    const dronesLayer = useDronesLayer();
    const tracesLayer = useDronesTracesLayer();
    
    const flightsTracesLayer = useFlightsTracesLayer();
    const trackedDroneLayer = useTrackedDroneLayer();

    const determineVisibleLayers = () => {
        if (tableSelectedDroneRegistration === null){
            return [ dronesLayer, tracesLayer ]
        }

        const result: Layer[] = [flightsTracesLayer]

        if (trackedFlight !== null){
            result.push(trackedDroneLayer)
        }

        return result;
    }

    return { layers: determineVisibleLayers() }
};

export default useLayerManager;