import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";
import FuelFilter from "./concreteFilters/FuelFilter";
import ModelFilter from "./concreteFilters/ModelFilter";
import LatitudeFilter from "./concreteFilters/LatitudeFilter";
import LongitudeFilter from "./concreteFilters/LongitudeFilter";
import { useTranslation } from 'react-i18next';
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
  const {t} = useTranslation();

  return(
    <div className={`content filterSection ${isOpen && 'opened'}`} style={{"height": "270px"}}>
      <div style={{"paddingLeft": "20px", "paddingTop": "20px"}}>
        {t("general.filters")}
        <div className="filters">
          <RegistrationNumberFilter
            value={getTextFilter("registrationNumber").value}
            onChange={(value) => onTextFilterChange("registrationNumber", value)}
            onReset={() => onTextFilterChange("registrationNumber", "")}
          />
          <AltitudeFilter
            minValue={getNumberFilter("minAltitude").value}
            maxValue={getNumberFilter("maxAltitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minAltitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxAltitude", value)}
            onMaxValueReset={() => onNumberFilterChange("minAltitude", undefined)}
            onMinValueReset={() => onNumberFilterChange("maxAltitude", undefined)}//
          />
          <LatitudeFilter
            minValue={getNumberFilter("minLatitude").value}
            maxValue={getNumberFilter("maxLatitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLatitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLatitude", value)}
            onMaxValueReset={() => onNumberFilterChange("minLatitude", undefined)}
            onMinValueReset={() => onNumberFilterChange("maxLatitude", undefined)}//
          />
          <LongitudeFilter
            minValue={getNumberFilter("minLongitude").value}
            maxValue={getNumberFilter("maxLongitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLongitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLongitude", value)}
            onMaxValueReset={() => onNumberFilterChange("minLongitude", undefined)}
            onMinValueReset={() => onNumberFilterChange("maxLongitude", undefined)}//
          />
          <FuelFilter
            minValue={getNumberFilter("minFuel").value}
            maxValue={getNumberFilter("maxFuel").value}
            onMinValueChange={(value) => onNumberFilterChange("minFuel", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxFuel", value)}
            onMinValueReset={() => onNumberFilterChange("minFuel", undefined)}
            onMaxValueReset={() => onNumberFilterChange("maxFuel", undefined)}
          />
          <ModelFilter
            value={getTextFilter("model").value}
            onChange={(value) => onTextFilterChange("model", value)}
            onReset={() => onTextFilterChange("model", "")}
          />
        </div>
        <div className="actionContainer">
          <button className="apply" onClick={applyFilters}>{t("filters.apply")}</button>
          <button className="apply" onClick={applyFilters}>{t("filters.reset")}</button>
        </div>
        
      </div>
      
    </div>
  )
}

export default FilterSection