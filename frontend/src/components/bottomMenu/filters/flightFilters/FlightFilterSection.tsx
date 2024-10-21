import React from "react"
import { useTranslation } from "react-i18next"
import useRefreshKey from "../../../../common/useRefreshKey"
import AverageSpeed from "./concreteFilters/AverageSpeed"
import DistanceFilter from "./concreteFilters/DistanceFilter"
import DurationFilter from "./concreteFilters/DurationFilter"
import ElevationGainFilter from "./concreteFilters/ElevationGainFilter"
import useFlightFilters from "../../../../filters/flights/useCases/useFlightFilters"
import StartDateTimeFilter from "./concreteFilters/StartDateTimeFilter"
import EndDateTimeFilter from "./concreteFilters/EndDateTimeFilter"
import DidLandFilter from "./concreteFilters/DidLandFilter"

const FlightFilterSection = () => {
    const {t} = useTranslation();
    const {refreshKey, refresh} = useRefreshKey();

    const {bulkFiltersActions, numberFilters, dateAndTimeFilters, timeFilters, booleanFilters} = useFlightFilters()

    const onResetFilters = () => {
        bulkFiltersActions.resetFilters()
        refresh()
    }

    return (
        <div className={`content filterSection opened`}>
            <div className="filterContainer">
                <b>{t("general.flightFilters")}</b>
                <div className="filters" key={refreshKey}>
                    <StartDateTimeFilter
                        minValue={dateAndTimeFilters.get("minStartDateAndTime").value}
                        maxValue={dateAndTimeFilters.get("maxStartDateAndTime").value}
                        onMaxValueChange={(value) => dateAndTimeFilters.onChange("maxStartDateAndTime", value)}
                        onMaxValueReset={() => dateAndTimeFilters.onReset("maxStartDateAndTime")}
                        onMinValueChange={(value) => dateAndTimeFilters.onChange("minStartDateAndTime", value)}
                        onMinValueReset={() => dateAndTimeFilters.onReset("minStartDateAndTime")}
                    />
                    <EndDateTimeFilter
                        minValue={dateAndTimeFilters.get("minEndDateAndTime").value}
                        maxValue={dateAndTimeFilters.get("maxEndDateAndTime").value}
                        onMaxValueChange={(value) => dateAndTimeFilters.onChange("maxEndDateAndTime", value)}
                        onMaxValueReset={() => dateAndTimeFilters.onReset("maxEndDateAndTime")}
                        onMinValueChange={(value) => dateAndTimeFilters.onChange("minEndDateAndTime", value)}
                        onMinValueReset={() => dateAndTimeFilters.onReset("minEndDateAndTime")}
                    />
                    <DurationFilter
                        maxValue={timeFilters.get("maxDuration").value}
                        minValue={timeFilters.get("minDuration").value}
                        onMaxValueChange={(value) => timeFilters.onChange("maxDuration", value)}
                        onMaxValueReset={() => timeFilters.onReset("maxDuration")}
                        onMinValueChange={(value) => timeFilters.onChange("minDuration", value)}
                        onMinValueReset={() => timeFilters.onReset("minDuration")}
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
                        maxValue={numberFilters.get("maxAverageSpeed").value}
                        minValue={numberFilters.get("minAverageSpeed").value}
                        onMaxValueChange={(value) => numberFilters.onChange("maxAverageSpeed", value)}
                        onMaxValueReset={() => numberFilters.onReset("maxAverageSpeed")}
                        onMinValueChange={(value) => numberFilters.onChange("minAverageSpeed", value)}
                        onMinValueReset={() => numberFilters.onReset("minAverageSpeed")}
                    />
                    <DidLandFilter
                        value={booleanFilters.get("didLand").value}
                        onChange={(value) => booleanFilters.onChange("didLand", value)}
                        onReset={() => booleanFilters.onReset("didLand")}
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