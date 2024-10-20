import React from "react"
import { FlightBooleanFilter, FlightBooleanFilterKey, FlightNumberFilter, FlightNumberFilterKey, FlightTextFilter, FlightTextFilterKey } from "../../../../filters/flights/types"
import { useTranslation } from "react-i18next"
import useRefreshKey from "../../../../common/useRefreshKey"
import AverageSpeed from "./concreteFilters/AverageSpeed"
import DateFilter from "./concreteFilters/DateFilter"
import TimeFilter from "./concreteFilters/TimeFilter"
import DistanceFilter from "./concreteFilters/DistanceFilter"
import DurationFilter from "./concreteFilters/DurationFilter"
import ElevationGainFilter from "./concreteFilters/ElevationGainFilter"
import DidLandedFilter from "./concreteFilters/DidLandedFilter"

interface Props{
    isOpen: boolean,
    getTextFilter: (filterKey: FlightTextFilterKey) => FlightTextFilter,
    onTextFilterChange: (filterKey: FlightTextFilterKey, value: string) => void,
    onTextFilterReset: (filterKey: FlightTextFilterKey) => void,
    getNumberFilter: (filterKey: FlightNumberFilterKey) => FlightNumberFilter,
    onNumberFilterChange: (filterKey: FlightNumberFilterKey, value: number | undefined) => void,
    onNumberFilterReset: (filterKey: FlightNumberFilterKey) => void,
    getBooleanFilter: (filterKey: FlightBooleanFilterKey) => FlightBooleanFilter,
    onBooleanFilterChange: (filterKey: FlightBooleanFilterKey, value: boolean | undefined) => void,
    onBooleanFilterReset: (fitlerKey: FlightBooleanFilterKey) => void,
    applyFilters: () => void,
    resetFilters: () => void,
}

const FlightFilterSection: React.FC<Props> = ({
    applyFilters,
    getBooleanFilter,
    getNumberFilter,
    getTextFilter,
    isOpen,
    onBooleanFilterChange,
    onBooleanFilterReset,
    onNumberFilterChange,
    onNumberFilterReset,
    onTextFilterChange,
    onTextFilterReset,
    resetFilters,
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
                    <DateFilter
                        minValue={getTextFilter("startDate").value}
                        maxValue={getTextFilter("endDate").value}
                        onMaxValueChange={(value) => onTextFilterChange("endDate", value)}
                        onMaxValueReset={() => onTextFilterReset("endDate")}
                        onMinValueChange={(value) => onTextFilterChange("startDate", value)}
                        onMinValueReset={() => onTextFilterReset("startDate")}
                    />
                    <TimeFilter
                        minValue={getTextFilter("startTime").value}
                        maxValue={getTextFilter("endTime").value}
                        onMaxValueChange={(value) => onTextFilterChange("endTime", value)}
                        onMaxValueReset={() => onTextFilterReset("endTime")}
                        onMinValueChange={(value) => onTextFilterChange("startTime", value)}
                        onMinValueReset={() => onTextFilterReset("startTime")}
                    />
                    <DurationFilter
                        maxValue={getTextFilter("maxDuration").value}
                        minValue={getTextFilter("minDuration").value}
                        onMaxValueChange={(value) => onTextFilterChange("maxDuration", value)}
                        onMaxValueReset={() => onTextFilterReset("maxDuration")}
                        onMinValueChange={(value) => onTextFilterChange("minDuration", value)}
                        onMinValueReset={() => onTextFilterReset("minDuration")}
                    />
                    <DistanceFilter
                        maxValue={getNumberFilter("maxDistance").value}
                        minValue={getNumberFilter("minDistance").value}
                        onMaxValueChange={(value) => onNumberFilterChange("maxDistance", value)}
                        onMaxValueReset={() => onNumberFilterReset("maxDistance")}
                        onMinValueChange={(value) => onNumberFilterChange("minDistance", value)}
                        onMinValueReset={() => onNumberFilterReset("minDistance")}
                    />
                    <ElevationGainFilter
                        maxValue={getNumberFilter("maxElevationGain").value}
                        minValue={getNumberFilter("minElevationGain").value}
                        onMaxValueChange={(value) => onNumberFilterChange("maxElevationGain", value)}
                        onMaxValueReset={() => onNumberFilterReset("maxElevationGain")}
                        onMinValueChange={(value) => onNumberFilterChange("minElevationGain", value)}
                        onMinValueReset={() => onNumberFilterReset("minElevationGain")}
                    />
                    <AverageSpeed
                        maxValue={getNumberFilter("minAverageSpeed").value}
                        minValue={getNumberFilter("maxAverageSpeed").value}
                        onMaxValueChange={(value) => onNumberFilterChange("maxAverageSpeed", value)}
                        onMaxValueReset={() => onNumberFilterReset("maxAverageSpeed")}
                        onMinValueChange={(value) => onNumberFilterChange("minAverageSpeed", value)}
                        onMinValueReset={() => onNumberFilterReset("minAverageSpeed")}
                    />
                    <DurationFilter
                        maxValue={getTextFilter("minDuration").value}
                        minValue={getTextFilter("maxDuration").value}
                        onMaxValueChange={(value) => onTextFilterChange("maxDuration", value)}
                        onMaxValueReset={() => onTextFilterReset("maxDuration")}
                        onMinValueChange={(value) => onTextFilterChange("minDuration", value)}
                        onMinValueReset={() => onTextFilterReset("minDuration")}
                    />
                    <DidLandedFilter
                        value={getBooleanFilter("didLanded").value}
                        onChange={(value) => onBooleanFilterChange("didLanded", value)}
                        onReset={() => onBooleanFilterReset("didLanded")}
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

export default FlightFilterSection