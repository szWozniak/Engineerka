import { LineLayer } from "deck.gl"
import { droneTrace } from "./types/lines"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const useTracesLayer = () => {
    const { drones, selectedDrone } = useContext(AppContext)

    const mapPositionsToTraces = (): droneTrace[] => {
        if (drones === undefined) return [];

        const traces: droneTrace[] = [];

        drones.forEach((drone) => {
            const trace = (drone.registrationNumber === selectedDrone?.registrationNumber) ? selectedDrone.trace : drone.trace

            for (let i = 0; i < trace.length - 1; i++) {
                traces.push({
                    id: 0,
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

export default useTracesLayer