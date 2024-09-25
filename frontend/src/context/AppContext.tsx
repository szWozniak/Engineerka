import React, { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState, 
  useEffect } from 'react';

import { Filter } from '../filters/types';
import { INITIAL_VIEW_STATE } from '../mapConfig/initialView';
import { MapViewState } from 'deck.gl';
import useApplyFilters from '../filters/useCases/useApplyFilters';
import { Drone, DroneBase, DroneFlightSummary } from '../drones/types';
import { DroneFlight } from '../flights/api/types';
import { useQuery } from '@tanstack/react-query';
import droneQueries from '../drones/repository/droneQuries';
import flightQueries from '../flights/repository/flightQueries';

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
  tableSelectedDroneFlights: DroneFlightSummary[];
  setTrackedFlight: Dispatch<SetStateAction<DroneFlight | null>>;
  trackedFlight: DroneFlight | null | undefined;
  setFlightsTableSelectedFlightId: Dispatch<SetStateAction<number | null >>;
  flightsTableSelectedFlightId: number | null;
  setTrackedPoint: Dispatch<SetStateAction<number>>;
  trackedPoint: number;
  setHighlightedFlightId: Dispatch<SetStateAction<number | null>>;
  highlightedFlightId: number | null;
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
  setTableSelectedDroneRegistration : () => { },
  tableSelectedDroneFlights: [],
  setTrackedFlight: () => {},
  trackedFlight: null,
  setFlightsTableSelectedFlightId: () => {},
  flightsTableSelectedFlightId: null,
  setTrackedPoint: () => {},
  trackedPoint: 0,
  setHighlightedFlightId: () => {},
  highlightedFlightId: null
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [selectedDroneRegistrationFromTable, setSelectedDroneRegistrationFromTable] = useState<string | null>(null)
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)
  const [trackedFlight, setTrackedFlight] = useState<DroneFlight | null>(null)
  const [trackedPoint, setTrackedPoint] = useState<number>(0)
  const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);

  const {filters, applyFilters} = useApplyFilters();

  const toggleFiltersVisibility = () => setFiltersVisibility(prev => !prev);

  const { data: drones } = useQuery(
    droneQueries.getCurrentDrones(filters)
  )

  const { data: allDrones } = useQuery(
    droneQueries.getAllDrones(filters)
  )

  const { data: selectedDroneFlightsSummaries } = useQuery(
    droneQueries.getSelectedDroneFlightsSummaries(selectedDroneRegistrationFromTable)
  )

  const { data: FlightStatusPanelSelectedDroneFlight } = useQuery(
    flightQueries.getFlight(selectedFlightId)
  )
  
  const { data: selectedDrone } = useQuery(
    droneQueries.getSelectedDroneData(selectedDroneRegistration)
  )

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
  
  useEffect(() => {
    setTrackedPoint((trackedFlight?.flightRecords?.length || 1) - 1)
  }, [trackedFlight])
  
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
      tableSelectedDroneRegistration: selectedDroneRegistrationFromTable,
      setTableSelectedDroneRegistration: setSelectedDroneRegistrationFromTable,
      tableSelectedDroneFlights: selectedDroneFlightsSummaries || [],
      trackedFlight: FlightStatusPanelSelectedDroneFlight,
      setTrackedFlight,
      setFlightsTableSelectedFlightId: setSelectedFlightId,
      flightsTableSelectedFlightId: selectedFlightId,
      trackedPoint,
      setTrackedPoint,
      highlightedFlightId,
      setHighlightedFlightId
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider