import { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState, 
  useEffect } from 'react';

import { INITIAL_VIEW_STATE } from '../mapConfig/initialView';
import { MapViewState } from 'deck.gl';
import { DroneFlightSummary } from '../drones/types';
import { DroneFlight } from '../flights/api/types';
import { useQuery } from '@tanstack/react-query';
import droneQueries from '../drones/repository/droneQuries';
import flightQueries from '../flights/repository/flightQueries';
import { Filter } from '../filters/types';
import { defaultFiltersState } from '../filters/useCases/useFilters';

type AppContextTypeTwo = {
  filtering: {
    value: Filter[],
    changeFilters: (filters: Filter[]) => void
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
  filtering:{
    value: defaultFiltersState,
    changeFilters: (_f: Filter[]) => { } 
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
  const [filters, setFilters] = useState<Filter[]>(defaultFiltersState);


  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)
  const [selectedDroneRegistrationFromTable, setSelectedDroneRegistrationFromTable] = useState<string | null>(null)
  const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)
  const [trackedFlight, setTrackedFlight] = useState<DroneFlight | null>(null)
  const [trackedPoint, setTrackedPoint] = useState<number>(0)
  const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);

  const { data: FlightStatusPanelSelectedDroneFlight } = useQuery(
    flightQueries.getFlight(selectedFlightId)
  )
  
  const { data: selectedDroneFlightsSummaries } = useQuery( //to move
    droneQueries.getSelectedDroneFlightsSummaries(selectedDroneRegistrationFromTable)
  )

  // useEffect(() => {
  //   setIsMapUpdated(false)
  // }, [selectedDroneRegistration])

  
  useEffect(() => {
    setTrackedPoint((trackedFlight?.flightRecords?.length || 1) - 1)
  }, [trackedFlight])
  
  return (
    <AppContext.Provider value={{
      filtering:{
        value: filters,
        changeFilters: setFilters
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