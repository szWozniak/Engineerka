import { LineLayer } from "deck.gl"
import { droneTrace } from "../types/lines"
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const useFlightsTracesLayer = () => {
  const { trackedFlight, tableSelectedDroneFlights, trackedPoint } = useContext(AppContext)

  const mapPositionsToTraces = (): droneTrace[] => {
    if (tableSelectedDroneFlights === undefined) return [];

    const flights = trackedFlight ? [{
      ...trackedFlight,
      flightRecords: trackedFlight.flightRecords.slice(0, trackedPoint+1)
    }] : tableSelectedDroneFlights
    const traces: droneTrace[] = [];

    flights.forEach((droneFlight, index) => {
      const trace = droneFlight?.flightRecords || []

      if (trace.length < 2) { return []}

      for (let i = 0; i < trace.length - 1; i++) {
        traces.push({
          id: index,
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
    getColor: _d => [0, 200, 200, 125],
    getWidth: _d => 5,
    pickable: false,
    visible: true,
  })
};

export default useFlightsTracesLayer;