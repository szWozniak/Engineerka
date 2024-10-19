import { DroneFilter, FilterType } from "../types";


export const defaultFiltersState: DroneFilter[] = [
    {
      type: FilterType.Text,
      parameter: "registrationNumber",
      key: "registrationNumber",
      value: "",
      comparisonType: "Contains"
    },
    {
      type: FilterType.Number,
      parameter: "altitude",
      key: "minAltitude",
      value: undefined,
      comparisonType: "GreaterThan"
    },
    {
      type: FilterType.Number,
      parameter: "altitude",
      key: "maxAltitude",
      value: undefined,
      comparisonType: "LesserThan"
    },
    {
      type: FilterType.Number,
      parameter: "longitude",
      key: "minLongitude",
      value: undefined,
      comparisonType: "GreaterThan"
    },
    {
      type: FilterType.Number,
      parameter: "longitude",
      key: "maxLongitude",
      value: undefined,
      comparisonType: "LesserThan"
    },
    {
      type: FilterType.Number,
      parameter: "latitude",
      key: "minLatitude",
      value: undefined,
      comparisonType: "GreaterThan"
    },
    {
      type: FilterType.Number,
      parameter: "latitude",
      key: "maxLatitude",
      value: undefined,
      comparisonType: "LesserThan"
    },
    {
      type: FilterType.Text,
      parameter: "operator",
      key: "operator",
      value: "",
      comparisonType: "Equals"
    },
    {
      type: FilterType.Number,
      parameter: "fuel",
      key: "minFuel",
      value: undefined,
      comparisonType: "GreaterThan"
    },
    {
      type: FilterType.Number,
      parameter: "fuel",
      key: "maxFuel",
      value: undefined,
      comparisonType: "LesserThan"
    },
    {
      type: FilterType.Text,
      parameter: "model",
      key: "model",
      value: "",
      comparisonType: "Contains"
    },
    {
      type: FilterType.Text,
      parameter: "type",
      key: "type",
      value: "",
      comparisonType: "Equals"
    }
  ]