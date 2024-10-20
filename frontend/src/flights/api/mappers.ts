import { FilterType } from "../../filters/commonTypes";
import { FlightBooleanFilter, FlightFilter, FlightNumberFilter, FlightTextFilter } from "../../filters/flights/types";

interface SeperatedFilters {
    textFilters: FlightTextFilter[],
    numberFilters: FlightNumberFilter[],
    booleanFilters: FlightBooleanFilter[]
}

const mapFlightFilters = (filters: FlightFilter[]): SeperatedFilters => {
    const textFilters: FlightTextFilter[] = filters.filter(f => f.type === FilterType.Text && f.value !== "") as FlightTextFilter[];
    const numberFilters: FlightNumberFilter[] = filters.filter(f => f.type === FilterType.Number &&
        f.value !== undefined &&
        f.value !== 0) as FlightNumberFilter[]
    const booleanFilters: FlightBooleanFilter[] = filters.filter(f => f.type === FilterType.Boolean && f.value !== undefined) as FlightBooleanFilter[]

    return {
        textFilters,
        numberFilters,
        booleanFilters
    }
}

export default mapFlightFilters