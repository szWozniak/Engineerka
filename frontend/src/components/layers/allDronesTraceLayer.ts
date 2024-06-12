import { LineLayer } from "deck.gl"
import { Drone } from "../../drones/types"

interface props{
    isVisible: boolean
    drones: Drone[] | undefined
}

type Trace = {
    id: number,
    start: [number, number, number]
    end: [number, number, number]
}

const allDronesTraceLayer = ({isVisible, drones} : props) => {
    
    const mapPositionsToTraces = (): Trace[] => {
        if (drones === undefined) return [];

        const traces: Trace[] = [];

        drones.forEach((drone, index) => {
            const trace = drone.trace

            traces.push({
                id: index,
                start: [drone.currentPosition.longitude, drone.currentPosition.latitude, drone.currentPosition.altitude],
                end:  [trace[0].longitude, trace[0].latitude, trace[0].altitude]
            })

            for(let i=0; i<trace.length-1; i++){
                traces.push({
                    id: index,
                    start: [trace[i].longitude, trace[i].latitude, trace[i].altitude],
                    end: [trace[i+1].longitude, trace[i+1].latitude, trace[i+1].altitude]
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
        visible: isVisible,
        transitions: {
            getSourcePosition:{
                duration: 3000
            },
            getTargetPosition:{
                duration: 3000
            }
        }
      })
}

export default allDronesTraceLayer