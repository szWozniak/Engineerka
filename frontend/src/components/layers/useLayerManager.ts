import { useState } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones } from '../../drones/api/api';
import useAllDrones3DLayer from './useAllDrones3DLayer';
import allDronesTraceLayer from './allDronesTraceLayer';
import ViewMode from './types/viewMode';

const useLayerManager = (currentView: ViewMode) => {
    const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
    const query = useQuery({
        queryKey: ["current-drones"],
        queryFn: getCurrentDrones,
        keepPreviousData: true,
        refetchInterval: 3000,
        enabled: currentView === ViewMode.ThreeDAll
    })

    const drones = query.data
    
    const getSelectedDrone = () => {
    if (drones === undefined) return undefined
    return drones.find(d => d.registrationNumber === selectedDrone)
    }

    const allDronesLayer = useAllDrones3DLayer({
        drones: drones,
        isVisible: currentView === ViewMode.ThreeDAll,
        onClick: setSelectedDrone,
        selectedDrone: selectedDrone
    });

    // const oneDroneLayer = specificDroneLayer({ //to change name
    //   selectedDrone: selectedDrone,
    //   isVisible: currentView === ViewMode.Specific
    // })

    const droneTraces = allDronesTraceLayer({
        isVisible: currentView === ViewMode.ThreeDAll
    });

    const layers = [
        allDronesLayer,
        // oneDroneLayer,
        droneTraces
      ];

    return {layers, getSelectedDrone}
};

export default useLayerManager;