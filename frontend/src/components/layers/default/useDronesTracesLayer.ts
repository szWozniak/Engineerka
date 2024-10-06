import { LineLayer } from "deck.gl"
import { droneTrace } from "../types/lines"
import useDrones from "../../../drones/useCases/useDrones";

const useDronesTracesLayer = () => {
  const {flyingDronesWithTimestamp, selectedDrone} = useDrones();

  const mapPositionsToTraces = (): droneTrace[] => {
    if (flyingDronesWithTimestamp === undefined) return [];

    const traces: droneTrace[] = [];

    flyingDronesWithTimestamp?.flyingDrones?.forEach((drone, index) => {
      const trace = (drone.registrationNumber === selectedDrone?.registrationNumber) ? selectedDrone.trace : drone.trace

      if (trace.length === 0) { return []}

      traces.push({
        id: index,
        start: [drone.currentPosition.longitude, drone.currentPosition.latitude, drone.currentPosition.altitude],
        end: [trace[0].longitude, trace[0].latitude, trace[0].altitude]
      })

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
}

export default useDronesTracesLayer