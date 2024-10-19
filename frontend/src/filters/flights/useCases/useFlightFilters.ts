import { useContext, useState } from "react";
import { FlightBooleanFilterKey, FlightFilter, FlightNumberFilter, FlightNumberFilterKey, FlightTextFilter, FlightTextFilterKey } from "../types";
import { defaultFlightsFiltersState } from "./defaultState";
import { AppContext } from "../../../context/AppContext";
import { FilterType } from "../../commonTypes";

const useFlightFilters = () => {
    const [currentFilters, setCurrentFilters] = useState<FlightFilter[]>(structuredClone(defaultFlightsFiltersState))

    const {filtering} = useContext(AppContext)

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false)

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

    const toggleFiltersVisibility = () => setAreFiltersOpen(prev => !prev);
    
    const closeFilters = () => setAreFiltersOpen(false);

    const getTextFilter = (key: FlightTextFilterKey): FlightTextFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Text){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
    }

    const onTextFilterChange = (key: FlightTextFilterKey, value: string) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = value
          }
          return f;
        }))
    }

    const onTextFilterReset = (key: FlightTextFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
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
        filters: filtering.drone.value,
        bulkFiltersActions: {
          applyFilters,
          resetFilters
        },
        visibility: {
          areOpen: areFiltersOpen,
          toggleVisibility: toggleFiltersVisibility,
          closeFilters: closeFilters
        },
        textFilters: {
            get: getTextFilter,
            onChange: onTextFilterChange,
            onReset: onTextFilterReset
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