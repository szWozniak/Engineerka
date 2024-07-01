import useDronesLayer from './useDronesLayer';
import useTracesLayer from './useTracesLayer';

const useLayerManager = () => {
    const dronesLayer = useDronesLayer();
    const tracesLayer = useTracesLayer();

    const layers = [
        dronesLayer,
        tracesLayer
    ];

    return { layers }
};

export default useLayerManager;