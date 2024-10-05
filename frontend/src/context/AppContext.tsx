import { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState,  
} from 'react'

import { Filter, FilterType } from '../filters/types';
import { defaultFiltersState } from '../filters/useCases/useFilters';
type AppContextTypeTwo = {
  filtering: {
    value: Filter[],
    changeFilters: (filters: Filter[]) => void
  },
  drones: {
    selectedDroneRegistration: string | null,
    selectDroneRegistration: (registrationNumber: string | null) => void 
  },
  flights: {
    droneRegistrationToShowFlightsFor: string | null,
    setDroneRegistrationToShowFlightsFor: Dispatch<SetStateAction<string | null>>
  }
}

export const AppContext = createContext<AppContextTypeTwo>({
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
    changeFilters: (_f: Filter[]) => { } 
  },
  drones: {
    selectedDroneRegistration: null,
    selectDroneRegistration: (_d: string | null) => {} 
  },
  flights: {
    droneRegistrationToShowFlightsFor: null,
    setDroneRegistrationToShowFlightsFor: () => {}
  }

})

const AppContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [filters, setFilters] = useState<Filter[]>(defaultFiltersState);
  const [selectedDroneRegistration, setSelectedDroneRegistration] = useState<string | null>(null)
  const [droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor] = useState<string | null>(null)
  
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
        setDroneRegistrationToShowFlightsFor
      }
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider