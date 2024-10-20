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
    flight: {
      value: [
        {
          type: FilterType.Text,
          parameter: "startDate",
          key: "startDate",
          value: "",
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Text,
          parameter: "startTime",
          key: "startTime",
          value: "",
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Text,
          parameter: "endDate",
          key: "endDate",
          value: "",
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Text,
          parameter: "endTime",
          key: "endTime",
          value: "",
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Text,
          parameter: "duration",
          key: "minDuration",
          value: "",
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Text,
          parameter: "duration",
          key: "maxDuration",
          value: "",
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Number,
          parameter: "averageSpeed",
          key: "minAverageSpeed",
          value: undefined,
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Number,
          parameter: "averageSpeed",
          key: "maxAverageSpeed",
          value: undefined,
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Number,
          parameter: "elevationGain",
          key: "minElevationGain",
          value: undefined,
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Number,
          parameter: "elevationGain",
          key: "maxElevationGain",
          value: undefined,
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Number,
          parameter: "distance",
          key: "minDistance",
          value: undefined,
          comparisonType: "GreaterThan"
      },
      {
          type: FilterType.Number,
          parameter: "distance",
          key: "maxDistance",
          value: undefined,
          comparisonType: "LesserThan"
      },
      {
          type: FilterType.Boolean,
          parameter: "didLanded",
          key: "didLanded",
          value: undefined,
          comparisonType: "Equals"
      },
    ],
    changeFilters: (_f: FlightFilter[]) => {}
  }
    
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