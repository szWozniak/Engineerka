import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones, getDroneByRegistration } from '../drones/api/api';
import { Drone } from '../drones/types';

type AppContextType = {
  drones: Drone[] | undefined
  selectedDrone: Drone | null
  setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>
}

export const AppContext = createContext<AppContextType>({
  drones: [],
  selectedDrone: null,
  setSelectedDroneRegistration: () => { }
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)

  useEffect(() => {
    console.log("Regi ", selectedDroneRegistration)
  }, [selectedDroneRegistration])

  const { data: drones } = useQuery({
    queryKey: ["current-drones"],
    queryFn: getCurrentDrones,
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true
  })

  const { data: selectedDrone } = useQuery(['drone', selectedDroneRegistration], () => {
    return selectedDroneRegistration ? getDroneByRegistration(selectedDroneRegistration) : null
  }, {
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true,
  })

  return (
    <AppContext.Provider value={{ drones, selectedDrone: selectedDrone || null, setSelectedDroneRegistration }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider