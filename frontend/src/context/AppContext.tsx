import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones, getDroneById } from '../drones/api/api';
import { Drone } from '../drones/types';

type AppContextType = {
  drones: Drone[] | undefined
  selectedDrone: Drone | null
  setSelectedDroneId: Dispatch<SetStateAction<number | null>>
}

export const AppContext = createContext<AppContextType>({
  drones: [],
  selectedDrone: null,
  setSelectedDroneId: () => { }
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneId, setSelectedDroneId] = useState<number | null>(null)

  const { data: drones } = useQuery({
    queryKey: ["current-drones"],
    queryFn: getCurrentDrones,
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true
  })

  const { data: selectedDrone } = useQuery(['drone', selectedDroneId], () => {
    return selectedDroneId ? getDroneById(selectedDroneId) : null
  }, {
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true,
  })

  return (
    <AppContext.Provider value={{ drones, selectedDrone: selectedDrone || null, setSelectedDroneId }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider