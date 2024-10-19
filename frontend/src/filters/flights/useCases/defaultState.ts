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
        type: FilterType.Number,
        parameter: "averageSpeed",
        key: "averageSpeed",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "elevationGain",
        key: "elevationGain",
        value: undefined,
        comparisonType: "Equals"
    },
    {
        type: FilterType.Number,
        parameter: "distance",
        key: "distance",
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