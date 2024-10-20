import React from "react"
import { useTranslation } from "react-i18next"
import useRefreshKey from "../../../../common/useRefreshKey"
import AverageSpeed from "./concreteFilters/AverageSpeed"
import DateFilter from "./concreteFilters/DateFilter"
import TimeFilter from "./concreteFilters/TimeFilter"
import DistanceFilter from "./concreteFilters/DistanceFilter"
import DurationFilter from "./concreteFilters/DurationFilter"
import ElevationGainFilter from "./concreteFilters/ElevationGainFilter"
import DidLandedFilter from "./concreteFilters/DidLandedFilter"
import useFlightFilters from "../../../../filters/flights/useCases/useFlightFilters"

interface Props{
    isOpen: boolean,
}

const FlightFilterSection: React.FC<Props> = ({
    isOpen
}) => {
    const {t} = useTranslation();
    const {refreshKey, refresh} = useRefreshKey();

    const {bulkFiltersActions, numberFilters, textFilters, booleanFilters} = useFlightFilters()

    const onResetFilters = () => {
        bulkFiltersActions.resetFilters()
        refresh()
    }

    return (
        <div className={`content filterSection ${isOpen && 'opened'}`}>
            <div className="filterContainer">
                <b>{t("general.flightFilters")}</b>
                <div className="filters" key={refreshKey}>
                    <DateFilter
                        minValue={textFilters.get("startDate").value}
                        maxValue={textFilters.get("endDate").value}
                        onMaxValueChange={(value) => textFilters.onChange("endDate", value)}
                        onMaxValueReset={() => textFilters.onReset("endDate")}
                        onMinValueChange={(value) => textFilters.onChange("startDate", value)}
                        onMinValueReset={() => textFilters.onReset("startDate")}
                    />
                    <TimeFilter
                        minValue={textFilters.get("startTime").value}
                        maxValue={textFilters.get("endTime").value}
                        onMaxValueChange={(value) => textFilters.onChange("endTime", value)}
                        onMaxValueReset={() => textFilters.onReset("endTime")}
                        onMinValueChange={(value) => textFilters.onChange("startTime", value)}
                        onMinValueReset={() => textFilters.onReset("startTime")}
                    />
                    <DurationFilter
                        maxValue={textFilters.get("maxDuration").value}
                        minValue={textFilters.get("minDuration").value}
                        onMaxValueChange={(value) => textFilters.onChange("maxDuration", value)}
                        onMaxValueReset={() => textFilters.onReset("maxDuration")}
                        onMinValueChange={(value) => textFilters.onChange("minDuration", value)}
                        onMinValueReset={() => textFilters.onReset("minDuration")}
                    />
                    <DistanceFilter
                        maxValue={numberFilters.get("maxDistance").value}
                        minValue={numberFilters.get("minDistance").value}
                        onMaxValueChange={(value) => numberFilters.onChange("maxDistance", value)}
                        onMaxValueReset={() => numberFilters.onReset("maxDistance")}
                        onMinValueChange={(value) => numberFilters.onChange("minDistance", value)}
                        onMinValueReset={() => numberFilters.onReset("minDistance")}
                    />
                    <ElevationGainFilter
                        maxValue={numberFilters.get("maxElevationGain").value}
                        minValue={numberFilters.get("minElevationGain").value}
                        onMaxValueChange={(value) => numberFilters.onChange("maxElevationGain", value)}
                        onMaxValueReset={() => numberFilters.onReset("maxElevationGain")}
                        onMinValueChange={(value) => numberFilters.onChange("minElevationGain", value)}
                        onMinValueReset={() => numberFilters.onReset("minElevationGain")}
                    />
                    <AverageSpeed
                        maxValue={numberFilters.get("minAverageSpeed").value}
                        minValue={numberFilters.get("maxAverageSpeed").value}
                        onMaxValueChange={(value) => numberFilters.onChange("maxAverageSpeed", value)}
                        onMaxValueReset={() => numberFilters.onReset("maxAverageSpeed")}
                        onMinValueChange={(value) => numberFilters.onChange("minAverageSpeed", value)}
                        onMinValueReset={() => numberFilters.onReset("minAverageSpeed")}
                    />
                    <DurationFilter
                        maxValue={textFilters.get("minDuration").value}
                        minValue={textFilters.get("maxDuration").value}
                        onMaxValueChange={(value) => textFilters.onChange("maxDuration", value)}
                        onMaxValueReset={() => textFilters.onReset("maxDuration")}
                        onMinValueChange={(value) => textFilters.onChange("minDuration", value)}
                        onMinValueReset={() => textFilters.onReset("minDuration")}
                    />
                    <DidLandedFilter
                        value={booleanFilters.get("didLanded").value}
                        onChange={(value) => booleanFilters.onChange("didLanded", value)}
                        onReset={() => booleanFilters.onReset("didLanded")}
                    />
                </div>
                <div className="actionContainer">
                    <button onClick={bulkFiltersActions.applyFilters}>{t("filters.apply")}</button>
                    <button onClick={onResetFilters}>{t("filters.reset")}</button>
                </div>
            </div>
        </div>
    )
}

export default FlightFilterSection