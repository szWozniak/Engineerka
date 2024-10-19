import { useContext, useState } from "react"
import { defaultFiltersState } from "./defaultState";
import { DroneFilter, FilterType, DroneNumberFilter, DroneNumberFilterKey, DroneTextFilter, DroneTextFilterKey } from "../types";
import { AppContext } from "../../../context/AppContext";

const useDroneFilters = () => {
    const [currentFilters, setCurrentFilters] = useState<DroneFilter[]>(structuredClone(defaultFiltersState));

    const {filtering} = useContext(AppContext);

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

    const toggleFiltersVisibility = () => setAreFiltersOpen(prev => !prev);
    
    const closeFilters = () => setAreFiltersOpen(false);

    const getTextFilter = (key: DroneTextFilterKey): DroneTextFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Text){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
      }
    
      const getNumberFilter = (key: DroneNumberFilterKey): DroneNumberFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Number){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
      }

      const onTextFilterChange = (key: DroneTextFilterKey, value: string) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = value
          }
          return f;
        }))
      }

      const onTextFilterReset = (key: DroneTextFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = ""
          }
          return f;
        }))
      }

    
      const onNumberFilterChange = (key: DroneNumberFilterKey, value: number | undefined) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = value
          }
          return f;
        }))
      }

      const onNumberFilterReset = (key: DroneNumberFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = undefined
          }
          return f;
        }))
      }

    const applyFilters = () => {
      filtering.changeFilters(currentFilters
        .filter(f => f.value !== "")
        .map(f => structuredClone(f)))
    }

    const resetFilters = () => {
      filtering.changeFilters(structuredClone(defaultFiltersState))
      setCurrentFilters(structuredClone(defaultFiltersState))
    }

    return {
        filters: filtering.value,
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
        }
    }
}

export default useDroneFilters;