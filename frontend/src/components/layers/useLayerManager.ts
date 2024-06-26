import { useContext } from 'react';
import useAllDronesLayer from './useAllDronesLayer';
import useAllTracesLayer from './useAllTracesLayer';
import ViewMode from '../../types/viewMode';
import { AppContext } from '../../context/AppContext';
import useSpecificDroneLayer from './useSpecificDroneLayer';
import useSpecificTraceLayer from './useSpecificTraceLayer';

const useLayerManager = (currentView: ViewMode) => {
    const { drones, selectedDrone } = useContext(AppContext)

    const allDronesLayer = useAllDronesLayer({
        isVisible: currentView === ViewMode.Default,
    });

    const oneDroneLayer = useSpecificDroneLayer({
        isVisible: currentView === ViewMode.Specific
    })

    const allDroneTraces = useAllTracesLayer({
        isVisible: currentView === ViewMode.Default
    });

    const oneDroneTrace = useSpecificTraceLayer({
        isVisible: currentView === ViewMode.Specific
    });

    const layers = [
        allDronesLayer,
        oneDroneLayer,
        allDroneTraces,
        oneDroneTrace
    ];

    return { layers }
};

export default useLayerManager;