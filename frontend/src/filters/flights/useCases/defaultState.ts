import { FilterType } from "../../commonTypes";
import { FlightFilter } from "../types";

export const defaultFlightsFiltersState: FlightFilter[] = [
    {
        type: FilterType.DateAndTime,
        parameter: "start",
        key: "startDateAndTime",
        value: "",
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "end",
        key: "endDateAndTime",
        value: "",
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "duration",
        key: "minDuration",
        value: "",
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.DateAndTime,
        parameter: "duration",
        key: "maxDuration",
        value: "",
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "minAverageSpeed",
        value: undefined,
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "maxAverageSpeed",
        value: undefined,
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "minElevationGain",
        value: undefined,
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "maxElevationGain",
        value: undefined,
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "minDistance",
        value: undefined,
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "maxDistance",
        value: undefined,
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.Boolean,
        parameter: "didLanded",
        key: "didLanded",
        value: undefined,
        comparisonType: "Equals"
    },
]