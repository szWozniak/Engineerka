import { useContext, useState } from "react"
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../types"
import { AppContext } from "../../context/AppContext";
import { defaultFiltersState } from "./defaultState";

const useFilters = () => {
    const [currentFilters, setCurrentFilters] = useState<Filter[]>(structuredClone(defaultFiltersState));

    const {filtering, flights} = useContext(AppContext);

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

    const toggleFiltersVisibility = () => setAreFiltersOpen(prev => !prev);
    
    const closeFilters = () => setAreFiltersOpen(false);

    const getTextFilter = (key: TextFilterKey): TextFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Text){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
      }
    
      const getNumberFilter = (key: NumberFilterKey): NumberFilter => {
        const searchedFilter = currentFilters.find(f => f.key === key);
    
        if (searchedFilter?.type !== FilterType.Number){
          throw new Error("Invalid key")
        }
    
        return searchedFilter;
      }

      const onTextFilterChange = (key: TextFilterKey, value: string) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = value
          }
          return f;
        }))
      }

      const onTextFilterReset = (key: TextFilterKey) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = ""
          }
          return f;
        }))
      }

    
      const onNumberFilterChange = (key: NumberFilterKey, value: number | undefined) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = value
          }
          return f;
        }))
      }

      const onNumberFilterReset = (key: NumberFilterKey) => {
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

export default useFilters;