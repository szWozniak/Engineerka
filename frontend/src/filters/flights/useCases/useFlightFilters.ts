import { useContext, useState } from "react";
import { FlightBooleanFilterKey, FlightDateAndTimeFilter, FlightDateAndTimeFilterKey, FlightFilter, FlightNumberFilter, FlightNumberFilterKey, FlightTimeFilter, FlightTimeFilterKey} from "../types";
import { defaultFlightsFiltersState } from "./defaultState";
import { AppContext } from "../../../context/AppContext";
import { FilterType } from "../../commonTypes";

const useFlightFilters = () => {
    const [currentFilters, setCurrentFilters] = useState<FlightFilter[]>(structuredClone(defaultFlightsFiltersState))

    const {filtering} = useContext(AppContext)

    const applyFilters = () => {
        filtering.flight.changeFilters(currentFilters
            .filter(f => f.value !== "" && f.value !== undefined)
            .map(f => structuredClone(f))
        )
    }

    const resetFilters = () => {
        filtering.flight.changeFilters(structuredClone(defaultFlightsFiltersState))
        setCurrentFilters(structuredClone(defaultFlightsFiltersState))
    }

    const getDateAndTimeFilter = (key: FlightDateAndTimeFilterKey): FlightDateAndTimeFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.DateAndTime){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
    }

    const onDateAndTimeFilterChange = (key: FlightDateAndTimeFilterKey, value: string) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.DateAndTime){
            f.value = value
          }
          return f;
        }))
    }

    const onDateAndTimeFilterReset = (key: FlightDateAndTimeFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.DateAndTime){
            f.value = ""
          }
          return f;
        }))
      }
    
    const getTimeFilter = (key: FlightTimeFilterKey): FlightTimeFilter => {
      const searchedFilter = currentFilters.find(f => f.key === key);
  
      if (searchedFilter?.type !== FilterType.Time){
        throw new Error("Invalid key")
      }
  
      return searchedFilter;
    }

    const onTimeFilterChange = (key: FlightTimeFilterKey, value: string) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Time){
            f.value = value
          }
          return f;
        }))
    }

    const onTimeFilterReset = (key: FlightTimeFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Time){
            f.value = ""
          }
          return f;
        }))
      }

    const getNumberFilter = (key: FlightNumberFilterKey): FlightNumberFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);

        if (searchedFilter?.type !== FilterType.Number){
            throw new Error("Invalid key")
        }

        return searchedFilter;
    }

    const onNumberFilterChange = (key: FlightNumberFilterKey, value: number | undefined) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = value
          }
          return f;
        }))
    }

    const onNumberFilterReset = (key: FlightNumberFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = undefined
          }
          return f;
        }))
    }

    const getBooleanFilter = (key: FlightBooleanFilterKey) => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Boolean){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
    }

    const onBooleanFilterChange = (key: FlightBooleanFilterKey, value: boolean | undefined) => {
        setCurrentFilters(prev => prev.map(f => {
            if (f.key === key && f.type === FilterType.Boolean){
              f.value = value
            }
            return f;
          }))
    }

    const onBooleanFilterReset = (key: FlightBooleanFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
            if (f.key === key && f.type === FilterType.Boolean){
              f.value = undefined
            }
            return f;
          }))
    }

    return {
        filters: filtering.flight.value,
        bulkFiltersActions: {
          applyFilters,
          resetFilters
        },
        dateAndTimeFilters: {
            get: getDateAndTimeFilter,
            onChange: onDateAndTimeFilterChange,
            onReset: onDateAndTimeFilterReset
        },
        timeFilters: {
          get: getTimeFilter,
          onChange: onTimeFilterChange,
          onReset: onTimeFilterReset
        },
        numberFilters: {
            get: getNumberFilter,
            onChange: onNumberFilterChange,
            onReset: onNumberFilterReset
        },
        booleanFilters: {
            get: getBooleanFilter,
            onChange: onBooleanFilterChange,
            onReset: onBooleanFilterReset
        }
    }
}

export default useFlightFilters;