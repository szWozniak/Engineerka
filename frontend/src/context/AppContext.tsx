import { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState,  
} from 'react'

import { DroneFilter } from '../filters/drone/types';
import { defaultDroneFiltersState as defaultDronesFiltersState } from '../filters/drone/useCases/defaultState';
import { FilterType } from '../filters/commonTypes';
import { FlightFilter } from '../filters/flights/types';
import { defaultFlightsFiltersState } from '../filters/flights/useCases/defaultState';
import AppView from '../view/types';
import { SortingMode, TableBeingSorted } from '../sorting/commonTypes';

type AppContextType = {
  filtering: {
    drone: {
      value: DroneFilter[],
      changeFilters: (filters: DroneFilter[]) => void
    },
    flight: {
      value: FlightFilter[],
      changeFilters: (filters: FlightFilter[]) => void 
    }
  },
  sorting: {
    sortingMode: SortingMode,
    setSortingMode: Dispatch<SetStateAction<SortingMode>>,
    sortingKey: string | null,
    setSortingKey: Dispatch<SetStateAction<string | null>>,
    tableBeingSorted: TableBeingSorted,
    setTableBeingSorted: Dispatch<SetStateAction<TableBeingSorted>>
  },
  drones: {
    selectedDroneRegistration: string | null,
    selectDroneRegistration: (registrationNumber: string | null) => void 
  },
  flights: {
    droneRegistrationToShowFlightsFor: string | null,
    setDroneRegistrationToShowFlightsFor: Dispatch<SetStateAction<string | null>>,
    highlightedFlightId: number | null,
    setHighlightedFlightId: Dispatch<SetStateAction<number | null>>,
    selectedFlightId: number | null,
    setSelectedFlightId: Dispatch<SetStateAction<number | null>>,
    trackedPoint : number,
    setTrackedPoint: Dispatch<SetStateAction<number>>
  },
  view: {
    currentView: AppView,
    setCurrentView: Dispatch<SetStateAction<AppView>>
  }
}

export const AppContext = createContext<AppContextType>({
  filtering:{
    drone: {
      value: [
        {
          type: FilterType.Text,
          parameter: "registrationNumber",
          key: "registrationNumber",
          value: "",
          comparisonType: "Equals"
        },
        {
          type: FilterType.Number,
          parameter: "altitude",
          key: "minAltitude",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "altitude",
          key: "maxAltitude",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "longitude",
          key: "minLongitude",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "longitude",
          key: "maxLongitude",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "latitude",
          key: "minLatitude",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "latitude",
          key: "maxLatitude",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "fuel",
          key: "minFuel",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
        },
        {
          type: FilterType.Number,
          parameter: "fuel",
          key: "maxFuel",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
        },
        {
          type: FilterType.Text,
          parameter: "model",
          key: "model",
          value: "",
          comparisonType: "Equals"
        }
      ],
      changeFilters: (_f: DroneFilter[]) => { } 
    },
    flight: {
      value: [
        {
          type: FilterType.DateAndTime,
          parameter: "start",
          key: "minStartDateAndTime",
          value: "",
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.DateAndTime,
          parameter: "start",
          key: "maxStartDateAndTime",
          value: "",
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.DateAndTime,
          parameter: "end",
          key: "minEndDateAndTime",
          value: "",
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.DateAndTime,
          parameter: "end",
          key: "maxEndDateAndTime",
          value: "",
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.Time,
          parameter: "duration",
          key: "minDuration",
          value: "",
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.Time,
          parameter: "duration",
          key: "maxDuration",
          value: "",
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "averageSpeed",
          key: "minAverageSpeed",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "averageSpeed",
          key: "maxAverageSpeed",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "elevationGain",
          key: "minElevationGain",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "elevationGain",
          key: "maxElevationGain",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "distance",
          key: "minDistance",
          value: undefined,
          comparisonType: "GreaterThanOrEqual"
      },
      {
          type: FilterType.Number,
          parameter: "distance",
          key: "maxDistance",
          value: undefined,
          comparisonType: "LesserThanOrEqual"
      },
      {
          type: FilterType.Boolean,
          parameter: "didLand",
          key: "didLand",
          value: undefined,
          comparisonType: "Equals"
      },
    ],
    changeFilters: (_f: FlightFilter[]) => {}
  }
    
  },
  sorting: {
    sortingMode: SortingMode.UNSORTED,
    setSortingMode: () => {},
    sortingKey: null,
    setSortingKey: () => {},
    tableBeingSorted: TableBeingSorted.NONE,
    setTableBeingSorted: () => {}
  },
  drones: {
    selectedDroneRegistration: null,
    selectDroneRegistration: (_d: string | null) => {} 
  },
  flights: {
    droneRegistrationToShowFlightsFor: null,
    setDroneRegistrationToShowFlightsFor: () => {},
    highlightedFlightId: null,
    setHighlightedFlightId: () => {},
    selectedFlightId: null,
    setSelectedFlightId: () => {},
    trackedPoint: 0,
    setTrackedPoint: () => {}
  },
  view: {
    currentView: AppView.Drones,
    setCurrentView: () => {}
  }

})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [droneFilters, setDroneFilters] = useState<DroneFilter[]>(defaultDronesFiltersState);
  const [flightFilters, setFlightFilters] = useState<FlightFilter[]>(defaultFlightsFiltersState);
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);
  const [droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor] = useState<string | null>(null)
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)
  const [trackedPoint, setTrackedPoint] = useState<number>(0)
  const [currentView, setCurrentView] = useState<AppView>(AppView.Drones)
  const [sortingMode, setSortingMode] = useState<SortingMode>(SortingMode.UNSORTED)
  const [sortingKey, setSortingKey] = useState<string | null>(null)
  const [tableBeingSorted, setTableBeingSorted] = useState<TableBeingSorted>(TableBeingSorted.NONE)
  
  
  return (
    <AppContext.Provider value={{
      filtering:{
        drone: {
          value: droneFilters,
          changeFilters: setDroneFilters
        },
        flight: {
          value: flightFilters,
          changeFilters: setFlightFilters
        }
      },
      sorting: {
        sortingMode,
        setSortingMode,
        sortingKey,
        setSortingKey,
        tableBeingSorted,
        setTableBeingSorted
      },
      drones: {
        selectedDroneRegistration: selectedDroneRegistration,
        selectDroneRegistration: setSelectedDroneRegistration
      },
      flights: {
        droneRegistrationToShowFlightsFor,
        setDroneRegistrationToShowFlightsFor,
        highlightedFlightId,
        setHighlightedFlightId,
        selectedFlightId,
        setSelectedFlightId,
        trackedPoint,
        setTrackedPoint
      },
      view: {
        currentView,
        setCurrentView
      }
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider