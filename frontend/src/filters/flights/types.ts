import { DroneFlightSummary } from "../../flights/types"
import { ComparisonType, FilterType } from "../commonTypes"

export type FlightFilterParameter = keyof DroneFlightSummary | "start" | "end"

type DefaultFilter = {
    parameter: FlightFilterParameter,
    comparisonType: ComparisonType
}

// export type FlightTextFilterKey = 

export type FlightDateAndTimeFilterKey = "minStartDateAndTime" | "maxStartDateAndTime" | "minEndDateAndTime" | "maxEndDateAndTime" | "minDuration" | "maxDuration"

export type FlightNumberFilterKey = "minAverageSpeed" | "maxAverageSpeed" | "minElevationGain" | "maxElevationGain" | "minDistance" | "maxDistance"

export type FlightBooleanFilterKey = "didLanded"

// export type FlightTextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: FlightTextFilterKey}

export type FlightNumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: FlightNumberFilterKey}

export type FlightBooleanFilter = DefaultFilter & {type: FilterType.Boolean, value: boolean | undefined, key: FlightBooleanFilterKey}

export type FlightDateAndTimeFilter = DefaultFilter & {type: FilterType.DateAndTime, value: string, key: FlightDateAndTimeFilterKey}

export type FlightFilter = FlightNumberFilter | FlightBooleanFilter | FlightDateAndTimeFilter

