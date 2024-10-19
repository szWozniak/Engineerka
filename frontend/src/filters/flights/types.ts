import { DroneFlightSummary } from "../../flights/api/types"
import { ComparisonType, FilterType } from "../commonTypes"

export type FlightFilterParameter = keyof DroneFlightSummary

type DefaultFilter = {
    parameter: FlightFilterParameter,
    comparisonType: ComparisonType
}

export type FlightTextFilterKey = "startDate" | "startTime" | "endDate" | "endTime" | "duration"

export type FlightNumberFilterKey = "averageSpeed" | "elevationGain" | "distance"

export type FlightBooleanFilterKey = "didLanded"

export type FlightTextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: FlightTextFilterKey}

export type FlightNumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: FlightNumberFilterKey}

export type FlightBooleanFilter = DefaultFilter & {type: FilterType.Boolean, value: boolean | undefined, key: FlightBooleanFilterKey}

export type FlightFilter = FlightTextFilter | FlightNumberFilter | FlightBooleanFilter

