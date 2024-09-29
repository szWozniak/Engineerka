import { useQuery } from "@tanstack/react-query";
import droneQueries from "../repository/droneQuries";
import { useEffect, useState } from "react";
import useFilters from "../../filters/useCases/useFilters";

const useDrones = () => {
    const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
    const {filters} = useFilters()
    
  
    const { data: flyingDrones } = useQuery(
        droneQueries.getCurrentDrones(filters)
    )
    
    const { data: allDrones } = useQuery(
        droneQueries.getAllDrones(filters)
    )

    const { data: selectedDrone } = useQuery(
        droneQueries.getSelectedDroneData(selectedDroneRegistration)
    )

    useEffect(() => {
        if(!flyingDrones?.find(drone => drone.registrationNumber === selectedDroneRegistration)) {
          setSelectedDroneRegistration(null)
        }
    }, [flyingDrones, selectedDroneRegistration])

    // useEffect(() => {
    //     if(!isMapUpdated) {
    //       setMapViewState(prev => ({
    //         ...prev,
    //         ...selectedDrone?.currentPosition,
    //         altitude: Math.max(selectedDrone?.currentPosition?.altitude || 1, 1),
    //         zoom: 15
    //       }))
    //       setIsMapUpdated(true)
    //     }
    //   }, [selectedDrone])

    return {
        flyingDrones: flyingDrones,
        allDrones: allDrones,
        selectedDrone: selectedDrone || null,
        selectDrone: setSelectedDroneRegistration
    }
}

export default useDrones
