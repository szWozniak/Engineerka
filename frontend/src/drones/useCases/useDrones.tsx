import { useQuery } from "@tanstack/react-query";
import droneQueries from "../repository/droneQuries";
import { useContext, useEffect } from "react";
import useFilters from "../../filters/useCases/useFilters";
import { AppContext } from "../../context/AppContext";

const useDrones = () => {
    const {drones} = useContext(AppContext);
    const {filters} = useFilters()
    
  
    const { data: flyingDrones } = useQuery(
        droneQueries.getCurrentDrones(filters)
    )
    
    const { data: allDrones } = useQuery(
        droneQueries.getAllDrones(filters)
    )

    const { data: selectedDrone } = useQuery(
        droneQueries.getSelectedDroneData(drones.selectedDroneRegistration)
    )

    useEffect(() => {
        if(!flyingDrones?.find(drone => drone.registrationNumber === drones.selectedDroneRegistration)) {
          drones.selectDroneRegistration(null)
        }
    }, [flyingDrones, drones])

    

    return {
        flyingDrones: flyingDrones,
        allDrones: allDrones,
        selectedDrone: selectedDrone || null,
        selectDrone: drones.selectDroneRegistration
    }
}

export default useDrones
