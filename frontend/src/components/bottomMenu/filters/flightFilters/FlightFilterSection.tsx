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
    getBooleanFilter: (filterKey: FlightBooleanFilterKey) => FlightBooleanFilter
    onBooleanFilterChange: (filterKey: FlightBooleanFilterKey, value: boolean | undefined) => void
    onBooleanFilterReset: (fitlerKey: FlightBooleanFilterKey) => void
    applyFilters: () => void
    resetFilters: () => void
}

const FlightFilterSection: React.FC<Props> = ({
    isOpen,
    getTextFilter,
    onTextFilterChange,
    onTextFilterReset,
    getNumberFilter,
    onNumberFilterChange,
    onNumberFilterReset,
    getBooleanFilter,
    onBooleanFilterChange,
    onBooleanFilterReset,
    applyFilters,
    resetFilters
}) => {
    const {t} = useTranslation();
    const {refreshKey, refresh} = useRefreshKey();

    const onResetFilters = () => {
        resetFilters()
        refresh()
    }

    <div className={`content filterSection ${isOpen && 'opened'}`}>
            <div className="filterContainer">
                <b>{t("general.filters")}</b>
                <div className="filters" key={refreshKey}>
                    <DateFilter
                        minValue={getTextFilter("startDate").value}
                        maxValue={getTextFilter("endDate").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <TimeFilter
                        minValue={getTextFilter("startTime").value}
                        maxValue={getTextFilter("endTime").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <DurationFilter
                        maxValue={getTextFilter("maxDuration").value}
                        minValue={getTextFilter("minDuration").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <DistanceFilter
                        maxValue={getNumberFilter("maxDistance").value}
                        minValue={getNumberFilter("minDistance").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <ElevationGainFilter
                        maxValue={getNumberFilter("maxElevationGain").value}
                        minValue={getNumberFilter("minElevationGain").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <AverageSpeed
                        maxValue={getNumberFilter("minAverageSpeed").value}
                        minValue={getNumberFilter("maxAverageSpeed").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <DurationFilter
                        maxValue={getTextFilter("minDuration").value}
                        minValue={getTextFilter("maxDuration").value}
                        onMaxValueChange={}
                        onMaxValueReset={}
                        onMinValueChange={}
                        onMinValueReset={}
                    />
                    <DidLandedFilter/>
                </div>
                <div className="actionContainer">
                    <button onClick={applyFilters}>{t("filters.apply")}</button>
                    <button onClick={onResetFilters}>{t("filters.reset")}</button>
                </div>
            </div>
        </div>
}

export default FlightFilterSection