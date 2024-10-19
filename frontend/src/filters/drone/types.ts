import { Drone } from "../../drones/types"
import { FlightRecord } from "../../flights/api/types"
import { ComparisonType, FilterType } from "../commonTypes"

export type DroneFilterParameter = keyof Drone | keyof FlightRecord

type DefaultFilter = {
  parameter: DroneFilterParameter,
  comparisonType: ComparisonType
}

export type DroneTextFilterKey = "registrationNumber" | "model" | "operator" | "type"

export type DroneNumberFilterKey = "minAltitude" | "maxAltitude" | "minFuel" | "maxFuel" | "maxLongitude" | "minLongitude" | "maxLatitude" | "minLatitude"

export type DroneTextFilter = DefaultFilter & {type: FilterType.Text, value: string, key: DroneTextFilterKey}

export type DroneNumberFilter = DefaultFilter & {type: FilterType.Number, value: number | undefined, key: DroneNumberFilterKey}

export type DroneFilter = DroneTextFilter | DroneNumberFilter;