import { 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  createContext, 
  useState, 
  useEffect } from 'react';

import { MapViewState } from 'deck.gl';
import { DroneFlightSummary } from '../drones/types';
import { DroneFlight } from '../flights/api/types';
import { useQuery } from '@tanstack/react-query';
import droneQueries from '../drones/repository/droneQuries';
import flightQueries from '../flights/repository/flightQueries';
import { Filter } from '../filters/types';
import { defaultFiltersState } from '../filters/useCases/useFilters';
import { INITIAL_VIEW_STATE } from '../map/config/initialView';

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
  // table: {
  //   selectedDroneRegistration: string | null,
  //   selectedDroneFlights: DroneFlightSummary[],
  //   setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>,
  // }
  // flights: {
  //   trackedFlight: DroneFlight | null | undefined,
  //   tableSelectedFlightId: number | null,
  //   trackedPoint: number,
  //   highlitedFlightId: number | null,
  //   setTrackedFlight: Dispatch<SetStateAction<DroneFlight | null>>,
  //   setTableSelectedFlightId: Dispatch<SetStateAction<number | null>>,
  //   setTrackedPoint: Dispatch<SetStateAction<number>>
  //   setHighlightedFlightId: Dispatch<SetStateAction<number | null>>
  // }
}

export const AppContext = createContext<AppContextTypeTwo>({
  filtering:{
    value: defaultFiltersState,
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