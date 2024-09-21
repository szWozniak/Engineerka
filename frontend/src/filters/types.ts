import { StringMappingType } from "typescript"
import { Drone, flightRecordPosition as FlightRecordPosition } from "../drones/types"

type ComparisonType = "Equals" | "GreaterThan" | "LesserThan" 

export enum FilterType{
  Text,
  Number
}

export type FilterParameter = keyof Drone | keyof FlightRecordPosition

type DefaultFilter = {
  parameter: FilterParameter,
  comparisonType: ComparisonType
}

export type TextFilterKey = "registrationNumber" | "model"

export type NumberFilterKey = "minAltitude" | "maxAltitude" | "minFuel" | "maxFuel"

export type TextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: TextFilterKey}

export type NumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: NumberFilterKey}

export type Filter = TextFilter | NumberFilter; 