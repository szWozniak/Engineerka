import { useState } from "react";
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../../../../filters/types"

const DefaultFiltersState: Filter[] = [
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
    const [filtersState, SetFiltersState] = useState<Filter[]>(DefaultFiltersState);

  const getTextFilter = (key: TextFilterKey): TextFilter => {
    const searchedFilter = filtersState.find(f => f.key === key);

    if (searchedFilter?.type !== FilterType.Text){
      throw new Error("Invalid key")
    }

    return searchedFilter;
  }

  const getNumberFilter = (key: NumberFilterKey): NumberFilter => {
    const searchedFilter = filtersState.find(f => f.key === key);

    if (searchedFilter?.type !== FilterType.Number){
      throw new Error("Invalid key")
    }

    return searchedFilter;
  }
  const onTextFilterChange = (key: TextFilterKey, value: string) => {
    SetFiltersState(prev => prev.map(f => {
      if (f.key === key && f.type === FilterType.Text){
        f.value = value
      }

      return f;
    }))
  }

  const onNumberFilterChange = (key: NumberFilterKey, value: number | undefined) => {
    SetFiltersState(prev => prev.map(f => {
      if (f.key === key && f.type === FilterType.Number){
        f.value = value
      }
      
      return f
    }))
  }

  return {
    filters: filtersState,
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

export default useFilters