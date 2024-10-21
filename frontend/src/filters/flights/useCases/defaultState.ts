import { FilterType } from "../../commonTypes";
import { FlightFilter } from "../types";

export const defaultFlightsFiltersState: FlightFilter[] = [
    {
        type: FilterType.DateAndTime,
        parameter: "start",
        key: "minStartDateAndTime",
        value: "",
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "start",
        key: "maxStartDateAndTime",
        value: "",
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "end",
        key: "minEndDateAndTime",
        value: "",
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "end",
        key: "maxEndDateAndTime",
        value: "",
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.Time,
        parameter: "duration",
        key: "minDuration",
        value: "",
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.Time,
        parameter: "duration",
        key: "maxDuration",
        value: "",
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "minAverageSpeed",
        value: undefined,
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "maxAverageSpeed",
        value: undefined,
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "minElevationGain",
        value: undefined,
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "maxElevationGain",
        value: undefined,
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "minDistance",
        value: undefined,
        comparisonType: "GreaterThanOrEqual"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "maxDistance",
        value: undefined,
        comparisonType: "LesserThanOrEqual"
    },
    {
        type: FilterType.Boolean,
        parameter: "didLand",
        key: "didLand",
        value: undefined,
        comparisonType: "Equals"
    },
]