import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones, getDroneByRegistration } from '../drones/api/api';
import { Drone } from '../drones/types';
import { INITIAL_VIEW_STATE } from '../mapConfig/initialView';
import { MapViewState } from 'deck.gl';

type AppContextType = {
  drones: Drone[] | undefined
  selectedDrone: Drone | null
  setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>
  mapViewState: MapViewState
  setMapViewState: any
}

export const AppContext = createContext<AppContextType>({
  drones: [],
  selectedDrone: null,
  setSelectedDroneRegistration: () => { },
  mapViewState: INITIAL_VIEW_STATE,
  setMapViewState: () => { }
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)

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

  useEffect(() => {
    setIsMapUpdated(false)
  }, [selectedDroneRegistration])

  useEffect(() => {
    if(!isMapUpdated) {
      setMapViewState(prev => ({
        ...prev,
        ...selectedDrone?.currentPosition,
        zoom: 15
      }))
      setIsMapUpdated(true)
    }
  }, [selectedDrone])

  return (
    <AppContext.Provider value={{ 
      drones, 
      selectedDrone: selectedDrone || null, 
      setSelectedDroneRegistration,
      mapViewState,
      setMapViewState
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider