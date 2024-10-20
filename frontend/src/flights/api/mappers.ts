import { FilterType } from "../../filters/commonTypes";
import { FlightBooleanFilter, FlightDateAndTimeFilter, FlightFilter, FlightNumberFilter } from "../../filters/flights/types";

interface SeperatedFilters {
    dateAndTimeFilters: FlightDateAndTimeFilter[],
    numberFilters: FlightNumberFilter[],
    booleanFilters: FlightBooleanFilter[]
}

const mapFlightFilters = (filters: FlightFilter[]): SeperatedFilters => {
    const dateAndTimeFilters: FlightDateAndTimeFilter[] = filters.filter(f => f.type === FilterType.DateAndTime && f.value !== "") as FlightDateAndTimeFilter[];
    const numberFilters: FlightNumberFilter[] = filters.filter(f => f.type === FilterType.Number &&
        f.value !== undefined &&
        f.value !== 0) as FlightNumberFilter[]
    const booleanFilters: FlightBooleanFilter[] = filters.filter(f => f.type === FilterType.Boolean && f.value !== undefined) as FlightBooleanFilter[]

    return {
        dateAndTimeFilters,
        numberFilters,
        booleanFilters
    }
}

export default mapFlightFilters