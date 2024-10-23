import { useQuery } from "@tanstack/react-query";
import droneQueries from "../repository/droneQuries";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import useDroneFilters from "../../filters/drone/useCases/useDroneFilters";

const useDrones = () => {
    const {drones} = useContext(AppContext);
    const {filters} = useDroneFilters()
    
    const { data: flyingDronesWithTimestamp } = useQuery(
        droneQueries.getCurrentDrones(filters)
    )
    
    const { data: allDrones } = useQuery(
        droneQueries.getAllDrones(filters)
    )

    const { data: selectedDrone } = useQuery(
        droneQueries.getSelectedDroneData(drones.selectedDroneRegistration)
    )

    useEffect(() => {
        if(!flyingDronesWithTimestamp?.flyingDrones?.find(drone => drone.registrationNumber === drones.selectedDroneRegistration)) {
          drones.selectDroneRegistration(null)
        }
    }, [flyingDronesWithTimestamp, drones])

    return {
        flyingDrones: flyingDronesWithTimestamp?.flyingDrones,
        timestamp: {date: flyingDronesWithTimestamp?.date, time: flyingDronesWithTimestamp?.time},
        allDrones: allDrones,
        selectedDrone: selectedDrone || null,
        selectDrone: drones.selectDroneRegistration
    }
}

export default useDrones
