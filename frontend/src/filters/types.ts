import { Drone } from "../drones/types"

type ComparisonType = "Equals" | "GreaterThan" | "LesserThan" 

export enum FilterType{
  Text,
  Number
}

export type DroneParameter = keyof Drone

export type TextFilter = {
  type: FilterType.Text
  parameter: DroneParameter,
  value: string,
  comparisonType: ComparisonType
}

export type NumberFilter = {
  type: FilterType.Number
  parameter: DroneParameter,
  value: number,
  comparisonType: ComparisonType
}

export type Filter = TextFilter | NumberFilter; 