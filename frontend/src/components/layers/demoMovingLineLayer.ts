
import { LineLayer } from "deck.gl";
import { paths } from "../../map/configuration/pathConfiguration";

const lineLayer = new LineLayer({
    id: 'flight-paths',
    data: paths,
    opacity: 0.8,
    getSourcePosition: d => d.start,
    getTargetPosition: d => d.end,
    getColor: _d => [0, 200, 200, 125],
    getWidth: _d => 5,
    pickable: false
  })

export default lineLayer;