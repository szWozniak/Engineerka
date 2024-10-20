import React from "react"
import { useTranslation } from "react-i18next"
import useRefreshKey from "../../../../common/useRefreshKey"
import AverageSpeed from "./concreteFilters/AverageSpeed"
import DistanceFilter from "./concreteFilters/DistanceFilter"
import DurationFilter from "./concreteFilters/DurationFilter"
import ElevationGainFilter from "./concreteFilters/ElevationGainFilter"
import DidLandedFilter from "./concreteFilters/DidLandedFilter"
import useFlightFilters from "../../../../filters/flights/useCases/useFlightFilters"
import StartDateTimeFilter from "./concreteFilters/StartDateTimeFilter"
import EndDateTimeFilter from "./concreteFilters/EndDateTimeFilter"

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
                    <StartDateTimeFilter
                        minValue={textFilters.get("minStartDateAndTime").value}
                        maxValue={textFilters.get("maxStartDateAndTime").value}
                        onMaxValueChange={(value) => textFilters.onChange("maxStartDateAndTime", value)}
                        onMaxValueReset={() => textFilters.onReset("maxStartDateAndTime")}
                        onMinValueChange={(value) => textFilters.onChange("minStartDateAndTime", value)}
                        onMinValueReset={() => textFilters.onReset("minStartDateAndTime")}
                    />
                    <EndDateTimeFilter
                        minValue={textFilters.get("minEndDateAndTime").value}
                        maxValue={textFilters.get("maxEndDateAndTime").value}
                        onMaxValueChange={(value) => textFilters.onChange("maxEndDateAndTime", value)}
                        onMaxValueReset={() => textFilters.onReset("maxEndDateAndTime")}
                        onMinValueChange={(value) => textFilters.onChange("minEndDateAndTime", value)}
                        onMinValueReset={() => textFilters.onReset("minEndDateAndTime")}
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
                        maxValue={numberFilters.get("maxAverageSpeed").value}
                        minValue={numberFilters.get("minAverageSpeed").value}
                        onMaxValueChange={(value) => numberFilters.onChange("maxAverageSpeed", value)}
                        onMaxValueReset={() => numberFilters.onReset("maxAverageSpeed")}
                        onMinValueChange={(value) => numberFilters.onChange("minAverageSpeed", value)}
                        onMinValueReset={() => numberFilters.onReset("minAverageSpeed")}
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