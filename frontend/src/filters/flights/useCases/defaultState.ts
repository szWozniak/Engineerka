import { FilterType } from "../../commonTypes";
import { FlightFilter } from "../types";

export const defaultFlightsFiltersState: FlightFilter[] = [
    {
        type: FilterType.Text,
        parameter: "startDate",
        key: "startDate",
        value: "",
        comparisonType: "Contains"
    },
    {
        type: FilterType.Text,
        parameter: "startTime",
        key: "startTime",
        value: "",
        comparisonType: "Contains"
    },
    {
        type: FilterType.Text,
        parameter: "endDate",
        key: "endDate",
        value: "",
        comparisonType: "Contains"
    },
    {
        type: FilterType.Text,
        parameter: "endTime",
        key: "endTime",
        value: "",
        comparisonType: "Contains"
    },
    {
        type: FilterType.Text,
        parameter: "duration",
        key: "minDuration",
        value: "",
        comparisonType: "GreaterThan"
    },
    {
        type: FilterType.Text,
        parameter: "duration",
        key: "maxDuration",
        value: "",
        comparisonType: "LesserThan"
    },
    {
        type: FilterType.Text,
        parameter: "endTime",
        key: "endTime",
        value: "",
        comparisonType: "Contains"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "minAverageSpeed",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "maxAverageSpeed",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "minElevationGain",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "maxElevationGain",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "minDistance",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "maxDistance",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Boolean,
        parameter: "didLanded",
        key: "didLanded",
        value: undefined,
        comparisonType: "Equals"
    },
]