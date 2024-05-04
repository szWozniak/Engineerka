import { LineLayer } from "deck.gl"
import { sampleData } from "./types/lines"

interface props{
    isVisible: boolean
}

const allDronesTraceLayer = ({isVisible} : props) => {
    return new LineLayer({
        id: 'flight-paths',
        data: sampleData,
        opacity: 0.8,
        getSourcePosition: d => d.start,
        getTargetPosition: d => d.end,
        getColor: _d => [0, 200, 200, 125],
        getWidth: _d => 5,
        pickable: false,
        visible: isVisible
      })
}

export default allDronesTraceLayer