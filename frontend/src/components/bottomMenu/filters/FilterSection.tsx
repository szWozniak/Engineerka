import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext"
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../../../filters/types";
import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";

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
  }
]

interface props{
  isOpen: boolean
}

const FilterSection: React.FC<props> = ({ isOpen }) => {
  const {applyFilters} = useContext(AppContext);
  
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

  return(
    <div className={`content filterSection ${isOpen && 'opened'}`} style={{"height": "270px"}}>
      <div style={{"paddingLeft": "20px", "paddingTop": "20px"}}>
        Filtry
        <div className="filters">
          <RegistrationNumberFilter
            onChange={(value) => onTextFilterChange("registrationNumber", value)}
            value={getTextFilter("registrationNumber").value}
          />
          <AltitudeFilter
            minValue={getNumberFilter("minAltitude").value}
            maxValue={getNumberFilter("maxAltitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minAltitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxAltitude", value)}
          />
        </div>
        <button className="apply" onClick={() => applyFilters(filtersState)}>Zastosuj</button>
      </div>
      
    </div>
  )
}

export default FilterSection