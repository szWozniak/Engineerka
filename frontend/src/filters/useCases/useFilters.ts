import { useContext, useState } from "react"
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../types"
import { AppContext } from "../../context/AppContext";

export const defaultFiltersState: Filter[] = [
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
  ]
  
const useFilters = () => {
    let currentFilters: Filter[] = structuredClone(defaultFiltersState);

    const {filtering} = useContext(AppContext);

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

    const toggleFiltersVisibility = () => setAreFiltersOpen(prev => !prev);

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
        currentFilters = currentFilters.map(f => {
          if (f.key === key && f.type === FilterType.Text){
            f.value = value
          }
          return f;
        })
      }
    
      const onNumberFilterChange = (key: NumberFilterKey, value: number | undefined) => {
        currentFilters = currentFilters.map(f => {
          if (f.key === key && f.type === FilterType.Number){
            f.value = value
          }
          return f;
        })
      }

    const applyFilters = () => filtering.changeFilters(currentFilters
        .filter(f => f.value !== "")
        .map(f => structuredClone(f))
    )

    return {
        filters: filtering.value,
        applyFilters,
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