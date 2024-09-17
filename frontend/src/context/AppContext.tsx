import React, { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAllDrones, getCurrentDrones, getDroneByRegistration } from '../drones/api/api';
import { Drone, DroneBase } from '../drones/types';
import { Filter } from '../filters/types';
import useFilters from '../filters/useFilters';
import { INITIAL_VIEW_STATE } from '../mapConfig/initialView';
import { MapViewState } from 'deck.gl';

type AppContextType = {
  drones: Drone[] | undefined;
  allDrones: DroneBase[] | undefined;
  selectedDrone: Drone | null;
  areFiltersOpened: boolean;
  setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>;
  applyFilters: (filters: Filter[]) => void;
  toggleFiltersVisibility: () => void;
  mapViewState: MapViewState;
  setMapViewState: any;
  tableSelectedDroneRegistration: string | null;
  setTableSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<AppContextType>({
  drones: [],
  allDrones: [],
  selectedDrone: null,
  areFiltersOpened: false,
  setSelectedDroneRegistration: () => { },
  applyFilters: (f) => {},
  toggleFiltersVisibility: () => {},
  mapViewState: INITIAL_VIEW_STATE,
  setMapViewState: () => { },
  tableSelectedDroneRegistration: null,
  setTableSelectedDroneRegistration : () => { }
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [tableSelectedDroneRegistration, setTableSelectedDroneRegistration] = useState<string | null>(null)
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)

  const {filters, applyFilters} = useFilters();

  const toggleFiltersVisibility = () => setFiltersVisibility(prev => !prev);


  const { data: drones } = useQuery({
    queryKey: ["current-drones", JSON.stringify(filters)],
    queryFn: () => getCurrentDrones(filters),
    keepPreviousData: true,
    refetchInterval: 1000,
    enabled: true
  })

  const { data: allDrones } = useQuery({
    queryKey: ["all-drones", JSON.stringify(filters)],
    queryFn: () => getAllDrones(filters),
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

  useEffect(() => {
    setIsMapUpdated(false)
  }, [selectedDroneRegistration])

  useEffect(() => {
    if(!drones?.find(drone => drone.registrationNumber === selectedDroneRegistration)) {
      setSelectedDroneRegistration(null)
    }
  }, [drones])

  useEffect(() => {
    if(!isMapUpdated) {
      setMapViewState(prev => ({
        ...prev,
        ...selectedDrone?.currentPosition,
        altitude: Math.max(selectedDrone?.currentPosition?.altitude || 1, 1),
        zoom: 15
      }))
      setIsMapUpdated(true)
    }
  }, [selectedDrone])

  return (
    <AppContext.Provider value={{ 
        drones,
        allDrones,
        selectedDrone: selectedDrone || null,
        setSelectedDroneRegistration, 
        applyFilters,
        areFiltersOpened: filtersVisibility,
        toggleFiltersVisibility,
        mapViewState,
        setMapViewState,
        tableSelectedDroneRegistration,
        setTableSelectedDroneRegistration }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider