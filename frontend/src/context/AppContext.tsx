import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
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

export interface TextFilter{
  type: FilterType.Text
  parameter: string,
  value: string,
  comparisonType: ComparisonType
}

export interface NumberFilter{
  type: FilterType.Number
  parameter: string,
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
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    console.log("Regi ", selectedDroneRegistration)
  }, [selectedDroneRegistration])

  const applyFilters = (curFilters: Filter[]) => setFilters(curFilters)

  const { data: drones } = useQuery({
    queryKey: ["current-drones", filters],
    queryFn: () => getCurrentDrones(filters),
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