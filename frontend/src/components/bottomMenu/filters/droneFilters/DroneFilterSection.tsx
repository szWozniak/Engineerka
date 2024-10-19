import React from 'react';
import RegistrationNumberFilter from './concreteFilters/RegistrationNumberFilter';
import LatitudeFilter from './concreteFilters/LatitudeFilter';
import AltitudeFilter from './concreteFilters/AltitudeFilter';
import FuelFilter from './concreteFilters/FuelFilter';
import LongitudeFilter from './concreteFilters/LongitudeFilter';
import ModelFilter from './concreteFilters/ModelFilter';
import OperatorFilter from './concreteFilters/OperatorFilter';
import TypeFilter from './concreteFilters/TypeFilter';
import { DroneTextFilterKey, DroneTextFilter, DroneNumberFilterKey, DroneNumberFilter } from '../../../../filters/drone/types';
import { useTranslation } from 'react-i18next';
import useRefreshKey from '../../../../common/useRefreshKey';

interface Props{
    isOpen: boolean,
    getTextFilter: (filterKey: DroneTextFilterKey) => DroneTextFilter,
    getNumberFilter: (filterKey: DroneNumberFilterKey) => DroneNumberFilter,
    onNumberFilterChange: (filterKey: DroneNumberFilterKey, value: number | undefined) => void,
    onNumberFilterReset: (filterKey: DroneNumberFilterKey) => void,
    onTextFilterChange: (filterKey: DroneTextFilterKey, value: string) => void,
    onTextFilterReset: (filterKey: DroneTextFilterKey) => void,
    applyFilters: () => void
    resetFilters: () => void
}

const DroneFilterSection: React.FC<Props> = ({ 
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

    return (
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

    );
};

export default DroneFilterSection;