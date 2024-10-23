import { FilterType } from "../../commonTypes";
import { DroneFilter } from "../types";


export const defaultDroneFiltersState: DroneFilter[] = [
    {
      type: FilterType.Text,
      parameter: "registrationNumber",
      key: "registrationNumber",
      value: "",
      comparisonType: "Contains"
    },
    {
      type: FilterType.Number,
      parameter: "recentAltitude",
      key: "minAltitude",
      value: undefined,
      comparisonType: "GreaterThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentAltitude",
      key: "maxAltitude",
      value: undefined,
      comparisonType: "LesserThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentLongitude",
      key: "minLongitude",
      value: undefined,
      comparisonType: "GreaterThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentLongitude",
      key: "maxLongitude",
      value: undefined,
      comparisonType: "LesserThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentLatitude",
      key: "minLatitude",
      value: undefined,
      comparisonType: "GreaterThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentLatitude",
      key: "maxLatitude",
      value: undefined,
      comparisonType: "LesserThanOrEqual"
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
      parameter: "recentFuel",
      key: "minFuel",
      value: undefined,
      comparisonType: "GreaterThanOrEqual"
    },
    {
      type: FilterType.Number,
      parameter: "recentFuel",
      key: "maxFuel",
      value: undefined,
      comparisonType: "LesserThanOrEqual"
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