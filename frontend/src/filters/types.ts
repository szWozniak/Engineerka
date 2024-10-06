import { Drone } from "../drones/types"
import { FlightRecord } from "../flights/api/types"

type ComparisonType = "Equals" | "GreaterThan" | "LesserThan" | "Contains"

export enum FilterType{
  Text,
  Number
}

export type FilterParameter = keyof Drone | keyof FlightRecord

type DefaultFilter = {
  parameter: FilterParameter,
  comparisonType: ComparisonType
}

export type TextFilterKey = "registrationNumber" | "model" | "operator" | "type"

export type NumberFilterKey = "minAltitude" | "maxAltitude" | "minFuel" | "maxFuel" | "maxLongitude" | "minLongitude" | "maxLatitude" | "minLatitude"

export type TextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: TextFilterKey}

export type NumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: NumberFilterKey}

export type Filter = TextFilter | NumberFilter;