import React from 'react';
import RegistrationNumberFilter from './concreteFilters/RegistrationNumberFilter';
import LatitudeFilter from './concreteFilters/LatitudeFilter';
import AltitudeFilter from './concreteFilters/AltitudeFilter';
import FuelFilter from './concreteFilters/FuelFilter';
import LongitudeFilter from './concreteFilters/LongitudeFilter';
import ModelFilter from './concreteFilters/ModelFilter';
import OperatorFilter from './concreteFilters/OperatorFilter';
import TypeFilter from './concreteFilters/TypeFilter';
import { useTranslation } from 'react-i18next';
import useRefreshKey from '../../../../common/useRefreshKey';
import useDroneFilters from '../../../../filters/drone/useCases/useDroneFilters';


const DroneFilterSection = () => {
    const {t} = useTranslation();
    const {refreshKey, refresh} = useRefreshKey();

    const {bulkFiltersActions, numberFilters, textFilters} = useDroneFilters()

    const onResetFilters = () => {
        bulkFiltersActions.resetFilters()
        refresh()
    }

    return (
        <div className={`content filterSection opened`}>
            <div className="filterContainer">
                <b>{t("general.droneFilters")}</b>
                <div className="filters" key={refreshKey}>
                    <RegistrationNumberFilter
                        value={textFilters.get("registrationNumber").value}
                        onChange={(value) => textFilters.onChange("registrationNumber", value)}
                        onReset={() => textFilters.onReset("registrationNumber")}
                    />
                    <LatitudeFilter
                        minValue={numberFilters.get("minLatitude").value}
                        maxValue={numberFilters.get("maxLatitude").value}
                        onMinValueChange={(value) => numberFilters.onChange("minLatitude", value)}
                        onMaxValueChange={(value) => numberFilters.onChange("maxLatitude", value)}
                        onMinValueReset={() => numberFilters.onReset("minLatitude")}
                        onMaxValueReset={() => numberFilters.onReset("maxLatitude")}
                    />
                    <LongitudeFilter
                        minValue={numberFilters.get("minLongitude").value}
                        maxValue={numberFilters.get("maxLongitude").value}
                        onMinValueChange={(value) => numberFilters.onChange("minLongitude", value)}
                        onMaxValueChange={(value) => numberFilters.onChange("maxLongitude", value)}
                        onMinValueReset={() => numberFilters.onReset("minLongitude")}
                        onMaxValueReset={() => numberFilters.onReset("maxLongitude")}
                    />
                    <AltitudeFilter
                        minValue={numberFilters.get("minAltitude").value}
                        maxValue={numberFilters.get("maxAltitude").value}
                        onMinValueChange={(value) => {
                            numberFilters.onChange("minAltitude", value)
                        }}
                        onMaxValueChange={(value) => numberFilters.onChange("maxAltitude", value)}
                        onMinValueReset={() => numberFilters.onReset("minAltitude")}
                        onMaxValueReset={() => numberFilters.onReset("maxAltitude")}
                    />
                    <OperatorFilter
                        value={textFilters.get("operator").value}
                        onChange={(value) => textFilters.onChange("operator", value)}
                        onReset={() => textFilters.onReset("operator")}
                    />
                    <FuelFilter
                        minValue={numberFilters.get("minFuel").value}
                        maxValue={numberFilters.get("maxFuel").value}
                        onMinValueChange={(value) => numberFilters.onChange("minFuel", value)}
                        onMaxValueChange={(value) => numberFilters.onChange("maxFuel", value)}
                        onMinValueReset={() => numberFilters.onReset("minFuel")}
                        onMaxValueReset={() => numberFilters.onReset("maxFuel")}
                    />
                    <ModelFilter
                        value={textFilters.get("model").value}
                        onChange={(value) => textFilters.onChange("model", value)}
                        onReset={() => textFilters.onReset("model")}
                    />
                    <TypeFilter
                        onChange={(value) => textFilters.onChange("type", value)}
                        value={textFilters.get("type").value}
                    />
                </div>
                <div className="actionContainer">
                    <button onClick={bulkFiltersActions.applyFilters} data-testid="apply-drones-filters">{t("filters.apply")}</button>
                    <button onClick={onResetFilters} data-testid="reset-drone-filters">{t("filters.reset")}</button>
                </div>
            </div>
        </div>

    );
};

export default DroneFilterSection;