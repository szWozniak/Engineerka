import { LineLayer } from "deck.gl"
import { droneTrace } from "../types/lines"
import { DroneFlight, DroneFlightSummary } from "../../../flights/types";

interface Props {
  trackedFlight: DroneFlight | null | undefined,
  trackedPoint: number,
  flightsSummaries: DroneFlightSummary[] | undefined,
  highlightedFlightId: number | null
}

const useFlightsTracesLayer = ({trackedFlight, trackedPoint, flightsSummaries, highlightedFlightId} : Props) => {
  const mapPositionsToTraces = (): droneTrace[] => {
    if (flightsSummaries === undefined) return [];

    const flightsToDisplay = trackedFlight ? [{
      ...trackedFlight,
      flightRecords: trackedFlight.flightRecords.slice(0, trackedPoint+1)
    }] : flightsSummaries
    
    const traces: droneTrace[] = [];

    flightsToDisplay.forEach((droneFlight, index) => {
      const trace = droneFlight?.flightRecords || []

      if (trace.length < 2) { return []}

      for (let i = 0; i < trace.length - 1; i++) {
        traces.push({
          id: droneFlight?.id,
          start: [trace[i].longitude, trace[i].latitude, trace[i].altitude],
          end: [trace[i + 1].longitude, trace[i + 1].latitude, trace[i + 1].altitude]
        })
      }
    });

    return traces;
  }

  return new LineLayer({
    id: 'flight-paths',
    data: mapPositionsToTraces(),
    opacity: 0.8,
    getSourcePosition: d => d.start,
    getTargetPosition: d => d.end,
    getColor: d => d.id === highlightedFlightId ? [200, 255, 255, 200] : [0, 200, 200, 125],
    getWidth: _d => 5,
    pickable: false,
    visible: true,
  })
};

export default useFlightsTracesLayer;