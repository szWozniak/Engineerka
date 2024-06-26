import { LineLayer } from "deck.gl"
import { Drone } from "../../drones/types"
import { droneTrace } from "./types/lines"
import ViewMode from '../../types/viewMode';
import { AppContext } from '../../context/AppContext';
import { useContext } from "react";

interface props {
  isVisible: boolean
}

const useSpecificTraceLayer = ({ isVisible }: props) => {
  const { drones, selectedDrone } = useContext(AppContext)

  const mapPositionsToTraces = (): droneTrace[] => {
    const traces: droneTrace[] = [];

    if (!selectedDrone) return traces

    const trace = selectedDrone.trace

    for (let i = 0; i < trace.length - 1; i++) {
      traces.push({
        id: 0,
        start: [trace[i].longitude, trace[i].latitude, trace[i].altitude],
        end: [trace[i + 1].longitude, trace[i + 1].latitude, trace[i + 1].altitude]
      })
    }

    return traces;
  }

  return new LineLayer({
    id: 'flight-paths',
    data: mapPositionsToTraces(),
    opacity: 0.8,
    getSourcePosition: d => d.start,
    getTargetPosition: d => d.end,
    getColor: _d => [0, 230, 230, 155],
    getWidth: _d => 5,
    pickable: false,
    visible: isVisible,
  })
}

export default useSpecificTraceLayer