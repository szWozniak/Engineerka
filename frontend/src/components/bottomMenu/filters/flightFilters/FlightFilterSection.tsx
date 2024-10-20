import React from "react"
import { useTranslation } from "react-i18next"
import useRefreshKey from "../../../../common/useRefreshKey"
import AverageSpeed from "./concreteFilters/AverageSpeed"
import DistanceFilter from "./concreteFilters/DistanceFilter"
import DurationFilter from "./concreteFilters/DurationFilter"
import ElevationGainFilter from "./concreteFilters/ElevationGainFilter"
import DidLandedFilter from "./concreteFilters/DidLandedFilter"
import useFlightFilters from "../../../../filters/flights/useCases/useFlightFilters"
import DateTimeFilter from "./concreteFilters/DateTimeFilter"

interface Props{
    isOpen: boolean,
}

const FlightFilterSection: React.FC<Props> = ({
    isOpen
}) => {
    const {t} = useTranslation();
    const {refreshKey, refresh} = useRefreshKey();

    const {bulkFiltersActions, numberFilters, dateAndTimeFilters: textFilters, booleanFilters} = useFlightFilters()

    const onResetFilters = () => {
        bulkFiltersActions.resetFilters()
        refresh()
    }

    return (
        <div className={`content filterSection ${isOpen && 'opened'}`}>
            <div className="filterContainer">
                <b>{t("general.flightFilters")}</b>
                <div className="filters" key={refreshKey}>
                    <DateTimeFilter
                        minValue={textFilters.get("startDateAndTime").value}
                        maxValue={textFilters.get("endDateAndTime").value}
                        onMaxValueChange={(value) => textFilters.onChange("endDateAndTime", value)}
                        onMaxValueReset={() => textFilters.onReset("endDateAndTime")}
                        onMinValueChange={(value) => textFilters.onChange("startDateAndTime", value)}
                        onMinValueReset={() => textFilters.onReset("startDateAndTime")}
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