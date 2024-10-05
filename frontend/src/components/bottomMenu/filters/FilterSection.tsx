import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext"
import { Filter, FilterType, NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../../../filters/types";
import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";
import FuelFilter from "./concreteFilters/FuelFilter";
import ModelFilter from "./concreteFilters/ModelFilter";
import LatitudeFilter from "./concreteFilters/LatitudeFilter";
import LongitudeFilter from "./concreteFilters/LongitudeFilter";
import { useTranslation } from 'react-i18next';

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
    parameter: "altitude",
    key: "maxLongitude",
    value: undefined,
    comparisonType: "LesserThan"
  },
  {
    type: FilterType.Number,
    parameter: "altitude",
    key: "minLatitude",
    value: undefined,
    comparisonType: "GreaterThan"
  },
  {
    type: FilterType.Number,
    parameter: "altitude",
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

interface props{
  isOpen: boolean
}

const FilterSection: React.FC<props> = ({ isOpen }) => {
  const { t } = useTranslation();

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
          <LatitudeFilter
            minValue={getNumberFilter("minLatitude").value}
            maxValue={getNumberFilter("maxLatitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLatitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLatitude", value)}
          />
          <LongitudeFilter
            minValue={getNumberFilter("minLongitude").value}
            maxValue={getNumberFilter("maxLongitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLongitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLongitude", value)}
          />
          <FuelFilter
            minValue={getNumberFilter("minFuel").value}
            maxValue={getNumberFilter("maxFuel").value}
            onMinValueChange={(value) => onNumberFilterChange("minFuel", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxFuel", value)}
          />
          <ModelFilter
            value={getTextFilter("model").value}
            onChange={(value) => onTextFilterChange("model", value)}
          />
        </div>
        <button className="apply" onClick={() => applyFilters(filtersState)}>{t("filters.apply")}</button>
      </div>
      
    </div>
  )
}

export default FilterSection