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
import useFilters from '../filters/useCases/useFilters';
import { Drone, DroneBase, DroneFlightSummary } from '../drones/types';
import { DroneFlight } from '../flights/api/types';
import { useQuery } from '@tanstack/react-query';
import droneQueries from '../drones/repository/droneQuries';
import flightQueries from '../flights/repository/flightQueries';

type AppContextTypeTwo = {
  drones: { //to mozna do hooka osobnego bo opiera sie na react query
    currentlyFlyng: Drone[] | undefined,
    all: DroneBase[] | undefined
    selected: Drone | null
    setSelected: Dispatch<SetStateAction<string | null>>
  }
  map: {
    viewState: MapViewState,
    setViewState: any
  }
  table: {
    selectedDroneRegistration: string | null,
    selectedDroneFlights: DroneFlightSummary[],
    setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>,
  }
  flights: {
    trackedFlight: DroneFlight | null | undefined,
    tableSelectedFlightId: number | null,
    trackedPoint: number,
    highlitedFlightId: number | null,
    setTrackedFlight: Dispatch<SetStateAction<DroneFlight | null>>,
    setTableSelectedFlightId: Dispatch<SetStateAction<number | null>>,
    setTrackedPoint: Dispatch<SetStateAction<number>>
    setHighlightedFlightId: Dispatch<SetStateAction<number | null>>
  }
}

export const AppContext = createContext<AppContextTypeTwo>({
  drones: {
    currentlyFlyng: [],
    all: [],
    selected: null,
    setSelected: () => { }
  },
  map: {
    viewState: INITIAL_VIEW_STATE,
    setViewState: () => { }
  },
  table: {
    selectedDroneRegistration: null,
    setSelectedDroneRegistration: () => { },
    selectedDroneFlights: [],
  },
  flights: {
    trackedFlight: null,
    setTrackedFlight: () => {},
    tableSelectedFlightId: null,
    setTableSelectedFlightId: () => {},
    trackedPoint: 0,
    setTrackedPoint: () => {},
    highlitedFlightId: null,
    setHighlightedFlightId: () => {}
  }
})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [selectedDroneRegistrationFromTable, setSelectedDroneRegistrationFromTable] = useState<string | null>(null)
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)
  
  const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)
  const [trackedFlight, setTrackedFlight] = useState<DroneFlight | null>(null)
  const [trackedPoint, setTrackedPoint] = useState<number>(0)
  const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);

  const {filters} = useFilters();

  const { data: flyingDrones } = useQuery(
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
    if(!flyingDrones?.find(drone => drone.registrationNumber === selectedDroneRegistration)) {
      setSelectedDroneRegistration(null)
    }
  }, [flyingDrones])

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
      drones: {
        currentlyFlyng: flyingDrones,
        all: allDrones,
        selected: selectedDrone || null,
        setSelected: setSelectedDroneRegistration
      },
      map: {
        viewState: mapViewState,
        setViewState: setMapViewState
      },
      table: {
        selectedDroneRegistration: selectedDroneRegistrationFromTable,
        setSelectedDroneRegistration: setSelectedDroneRegistrationFromTable,
        selectedDroneFlights: selectedDroneFlightsSummaries || [],
      },
      flights: {
        trackedFlight: FlightStatusPanelSelectedDroneFlight,
        setTrackedFlight: setTrackedFlight,
        tableSelectedFlightId: selectedFlightId,
        setTableSelectedFlightId: setSelectedFlightId,
        trackedPoint: trackedPoint,
        setTrackedPoint: setTrackedPoint,
        highlitedFlightId: highlightedFlightId,
        setHighlightedFlightId: setHighlightedFlightId
      }
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider