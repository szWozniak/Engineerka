import { useContext, useState } from "react"
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../types"
import { AppContext } from "../../context/AppContext";
import { defaultFiltersState } from "./defaultState";


  
const useFilters = () => {
    const [currentFilters, setCurrentFilters] = useState<Filter[]>(structuredClone(defaultFiltersState));

    const {filtering} = useContext(AppContext);

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

    const toggleFiltersVisibility = () => setAreFiltersOpen(prev => !prev);

    const resetFilters = () => {
      filtering.changeFilters(structuredClone(defaultFiltersState))
    }

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
    
      const onNumberFilterChange = (key: NumberFilterKey, value: number | undefined) => {
        setCurrentFilters(prev => prev.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = value
          }
          return f;
        }))
      }

    const applyFilters = () => {
      filtering.changeFilters(currentFilters
        .filter(f => f.value !== "")
        .map(f => structuredClone(f)))
    }
    

    return {
        filters: filtering.value,
        applyFilters,
        resetFilters,
        visibility: {
          areOpen: areFiltersOpen,
          toggleVisibility: toggleFiltersVisibility
        },
        textFilters: {
            get: getTextFilter,
            onChange: onTextFilterChange
        },
        numberFilters: {
            get: getNumberFilter,
            onChange: onNumberFilterChange
        }
    }
}

export default useFilters;