import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCurrentDrones, getDroneByRegistration } from '../drones/api/api';
import { Drone } from '../drones/types';
import { Filter } from '../filters/types';
import useFilters from '../filters/useFilters';

type AppContextType = {
  drones: Drone[] | undefined;
  selectedDrone: Drone | null;
  areFiltersOpened: boolean;
  setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>;
  applyFilters: (filters: Filter[]) => void;
  toggleFiltersVisibility: () => void
}

export const AppContext = createContext<AppContextType>({
  drones: [],
  selectedDrone: null,
  areFiltersOpened: false,
  setSelectedDroneRegistration: () => { },
  applyFilters: (f) => {},
  toggleFiltersVisibility: () => {}
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);

  useEffect(() => {
    console.log("Regi ", selectedDroneRegistration)
  }, [selectedDroneRegistration])

  const {filters, applyFilters} = useFilters();

  const toggleFiltersVisibility = () => setFiltersVisibility(prev => !prev);

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
    <AppContext.Provider value={{ 
        drones,
        selectedDrone: selectedDrone || null,
        setSelectedDroneRegistration, 
        applyFilters,
        areFiltersOpened: filtersVisibility,
        toggleFiltersVisibility }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider