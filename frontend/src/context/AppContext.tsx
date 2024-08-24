import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones, getDroneByRegistration } from '../drones/api/api';
import { Drone } from '../drones/types';

type AppContextType = {
  drones: Drone[] | undefined
  selectedDrone: Drone | null
  setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>
  applyFilters: (filters: Filter[]) => void
}

type ComparisonType = "Equals" | "GreaterThan" | "LesserThan" 

export enum FilterType{
  Text,
  Number
}

export type DroneParameter = keyof Drone

export type TextFilter = {
  type: FilterType.Text
  parameter: DroneParameter,
  value: string,
  comparisonType: ComparisonType
}

export type NumberFilter = {
  type: FilterType.Number
  parameter: DroneParameter,
  value: number,
  comparisonType: ComparisonType
}

export type Filter = TextFilter | NumberFilter; 

export const AppContext = createContext<AppContextType>({
  drones: [],
  selectedDrone: null,
  setSelectedDroneRegistration: () => { },
  applyFilters: (f) => {}
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [filtersState, setFiltersState] = useState<Filter[]>([])

  useEffect(() => {
    console.log("Regi ", selectedDroneRegistration)
  }, [selectedDroneRegistration])

  const applyFilters = (curFilters: Filter[]) => setFiltersState(curFilters
    .filter(f => f.value !== "")
    .map(f => structuredClone(f))
  )

  const { data: drones } = useQuery({
    queryKey: ["current-drones", filtersState],
    queryFn: () => getCurrentDrones(filtersState),
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true
  })

  const { data: selectedDrone } = useQuery({
    queryKey: ['drone', selectedDroneRegistration],
    queryFn:  () => {
      return selectedDroneRegistration ? getDroneByRegistration(selectedDroneRegistration) : null
    },
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true,
  })

  return (
    <AppContext.Provider value={{ drones, selectedDrone: selectedDrone || null, setSelectedDroneRegistration, applyFilters }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider