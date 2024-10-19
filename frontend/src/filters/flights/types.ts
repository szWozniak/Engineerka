import { ComparisonType, FilterType } from "../commonTypes"
import { FilterParameter } from "../drone/types"

type DefaultFilter = {
    parameter: FilterParameter,
    comparisonType: ComparisonType
}

export type FlightTextFilterKey = ""

export type FlightNumberFilterKey = ""

export type FlightTextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: FlightTextFilterKey}

export type FlightNumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: FlightNumberFilterKey}

export type FlightFilter = FlightTextFilter | FlightNumberFilter

