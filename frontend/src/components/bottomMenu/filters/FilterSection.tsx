import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";
import FuelFilter from "./concreteFilters/FuelFilter";
import ModelFilter from "./concreteFilters/ModelFilter";
import LatitudeFilter from "./concreteFilters/LatitudeFilter";
import LongitudeFilter from "./concreteFilters/LongitudeFilter";
import { useTranslation } from 'react-i18next';
import { NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from "../../../filters/types";
import useRefreshKey from "../../../common/useRefreshKey";
import OperatorFilter from "./concreteFilters/OperatorFilter";
import TypeFilter from "./concreteFilters/TypeFilter";

interface props{
  isOpen: boolean,
  getTextFilter: (filterKey: TextFilterKey) => TextFilter,
  getNumberFilter: (filterKey: NumberFilterKey) => NumberFilter,
  onNumberFilterChange: (filterKey: NumberFilterKey, value: number | undefined) => void,
  onNumberFilterReset: (filterKey: NumberFilterKey) => void,
  onTextFilterChange: (filterKey: TextFilterKey, value: string) => void,
  onTextFilterReset: (filterKey: TextFilterKey) => void,
  applyFilters: () => void
  resetFilters: () => void
}

const FilterSection: React.FC<props> = ({ 
  isOpen,
  getNumberFilter,
  getTextFilter,
  onNumberFilterChange,
  onNumberFilterReset,
  onTextFilterChange,
  onTextFilterReset,
  applyFilters,
  resetFilters
 }) => {
  const {t} = useTranslation();
  const {refreshKey, refresh} = useRefreshKey();

  const onResetFilters = () => {
    resetFilters()
    refresh()
  }

  return(
    <div className={`content filterSection ${isOpen && 'opened'}`}>
      <div className="filterContainer">
        <b>{t("general.filters")}</b>
        <div className="filters" key={refreshKey}>
          <RegistrationNumberFilter
            value={getTextFilter("registrationNumber").value}
            onChange={(value) => onTextFilterChange("registrationNumber", value)}
            onReset={() => onTextFilterReset("registrationNumber")}
          />
          <LatitudeFilter
            minValue={getNumberFilter("minLatitude").value}
            maxValue={getNumberFilter("maxLatitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLatitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLatitude", value)}
            onMinValueReset={() => onNumberFilterReset("minLatitude")}
            onMaxValueReset={() => onNumberFilterReset("maxLatitude")}
          />
          <LongitudeFilter
            minValue={getNumberFilter("minLongitude").value}
            maxValue={getNumberFilter("maxLongitude").value}
            onMinValueChange={(value) => onNumberFilterChange("minLongitude", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxLongitude", value)}
            onMinValueReset={() => onNumberFilterReset("minLongitude")}
            onMaxValueReset={() => onNumberFilterReset("maxLongitude")}
          />
          <AltitudeFilter
            minValue={getNumberFilter("minAltitude").value}
            maxValue={getNumberFilter("maxAltitude").value}
            onMinValueChange={(value) => {
              onNumberFilterChange("minAltitude", value)
            }}
            onMaxValueChange={(value) => onNumberFilterChange("maxAltitude", value)}
            onMinValueReset={() => onNumberFilterReset("minAltitude")}
            onMaxValueReset={() => onNumberFilterReset("maxAltitude")}
          />
          <OperatorFilter
            value={getTextFilter("operator").value}
            onChange={(value) => onTextFilterChange("operator", value)}
            onReset={() => onTextFilterReset("operator")}
          />
          <FuelFilter
            minValue={getNumberFilter("minFuel").value}
            maxValue={getNumberFilter("maxFuel").value}
            onMinValueChange={(value) => onNumberFilterChange("minFuel", value)}
            onMaxValueChange={(value) => onNumberFilterChange("maxFuel", value)}
            onMinValueReset={() => onNumberFilterReset("minFuel")}
            onMaxValueReset={() => onNumberFilterReset("maxFuel")}
          />
          <ModelFilter
            value={getTextFilter("model").value}
            onChange={(value) => onTextFilterChange("model", value)}
            onReset={() => onTextFilterReset("model")}
          />
          <TypeFilter
            onChange={(value) => onTextFilterChange("type", value)}
            value={getTextFilter("type").value}
          />
        </div>
        <div className="actionContainer">
          <button onClick={applyFilters}>{t("filters.apply")}</button>
          <button onClick={onResetFilters}>{t("filters.reset")}</button>
        </div>
      </div>
    </div>
  )
}

export default FilterSection