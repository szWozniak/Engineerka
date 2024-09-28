import { useContext } from "react";
import { AppContext } from "../../../context/AppContext"
import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";
import FuelFilter from "./concreteFilters/FuelFilter";
import ModelFilter from "./concreteFilters/ModelFilter";
import LatitudeFilter from "./concreteFilters/LatitudeFilter";
import LongitudeFilter from "./concreteFilters/LongitudeFilter";
import useFilters from "../../../filters/useCases/useFilters";
import { NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../../../filters/types";

interface props{
  isOpen: boolean,
  getTextFilter: (filterKey: TextFilterKey) => TextFilter,
  getNumberFilter: (filterKey: NumberFilterKey) => NumberFilter,
  onNumberFilterChange: (filterKey: NumberFilterKey, value: number | undefined) => void,
  onTextFilterChange: (filterKey: TextFilterKey, value: string) => void,
  applyFilters: () => void
}

const FilterSection: React.FC<props> = ({ 
  isOpen,
  getNumberFilter,
  getTextFilter,
  onNumberFilterChange,
  onTextFilterChange,
  applyFilters
 }) => {

  return(
    <div className={`content filterSection ${isOpen && 'opened'}`} style={{"height": "270px"}}>
      <div style={{"paddingLeft": "20px", "paddingTop": "20px"}}>
        Filtry
        <div className="filters">
          <RegistrationNumberFilter
            value={getTextFilter("registrationNumber").value}
            onChange={(value) => onTextFilterChange("registrationNumber", value)}
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
            maxValue={numberFilters.get("maxLongitude").value}
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
        <button className="apply" onClick={() => applyFilters}>Zastosuj</button>
      </div>
      
    </div>
  )
}

export default FilterSection