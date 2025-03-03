import useDronesLayer from './default/useDronesLayer';
import useDronesTracesLayer from './default/useDronesTracesLayer';
import useFlightsTracesLayer from './flights/useFlightsTracesLayer';
import useTrackedDroneLayer from './flights/useTrackedDroneLayer';
import { Layer } from 'deck.gl';
import useFlights from '../../flights/useCases/useFlights';

const useLayerManager = () => {
    const { flightsSummaries, detailedFlight } = useFlights();
    
    const dronesLayer = useDronesLayer();
    const tracesLayer = useDronesTracesLayer();
    
    const flightsTracesLayer = useFlightsTracesLayer(
        {
            flightsSummaries: flightsSummaries.flightsSummaries,
            highlightedFlightId: flightsSummaries.highlightedFlightId,
            trackedFlight: detailedFlight.trackedFlight,
            trackedPoint: detailedFlight.trackedPoint
        }
    );

    const trackedDroneLayer = useTrackedDroneLayer(
        {
            trackedFlight: detailedFlight.trackedFlight,
            trackedPoint: detailedFlight.trackedPoint
        }
    );

    const determineVisibleLayers = () => {
        if (flightsSummaries.flightsSummaries === undefined){
            return [ dronesLayer, tracesLayer ]
        }

        const result: Layer[] = [flightsTracesLayer]

        if (detailedFlight.trackedFlight !== undefined){
            result.push(trackedDroneLayer)
        }

        return result;
    }

    return { layers: determineVisibleLayers() }
};

export default useLayerManager;