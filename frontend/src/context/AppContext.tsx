import { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState,  
} from 'react'

import { DroneFilter, FilterType } from '../filters/drone/types';
import { defaultFiltersState } from '../filters/drone/useCases/defaultState';
type AppContextType = {
  filtering: {
    value: DroneFilter[],
    changeFilters: (filters: DroneFilter[]) => void
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
  }
}

export const AppContext = createContext<AppContextType>({
  filtering:{
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
        comparisonType: "GreaterThan"
      },
      {
        type: FilterType.Number,
        parameter: "altitude",
        key: "maxAltitude",
        value: undefined,
        comparisonType: "LesserThan"
      },
      {
        type: FilterType.Number,
        parameter: "longitude",
        key: "minLongitude",
        value: undefined,
        comparisonType: "GreaterThan"
      },
      {
        type: FilterType.Number,
        parameter: "longitude",
        key: "maxLongitude",
        value: undefined,
        comparisonType: "LesserThan"
      },
      {
        type: FilterType.Number,
        parameter: "latitude",
        key: "minLatitude",
        value: undefined,
        comparisonType: "GreaterThan"
      },
      {
        type: FilterType.Number,
        parameter: "latitude",
        key: "maxLatitude",
        value: undefined,
        comparisonType: "LesserThan"
      },
      {
        type: FilterType.Number,
        parameter: "fuel",
        key: "minFuel",
        value: undefined,
        comparisonType: "GreaterThan"
      },
      {
        type: FilterType.Number,
        parameter: "fuel",
        key: "maxFuel",
        value: undefined,
        comparisonType: "LesserThan"
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
  }

})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [filters, setFilters] = useState<DroneFilter[]>(defaultFiltersState);
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);
  const [droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor] = useState<string | null>(null)
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)
  const [trackedPoint, setTrackedPoint] = useState<number>(0)
  
  return (
    <AppContext.Provider value={{
      filtering:{
        value: filters,
        changeFilters: setFilters
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
      }
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider