import { FilterType } from "../../filters/commonTypes";
import { FlightBooleanFilter, FlightDateAndTimeFilter, FlightFilter, FlightNumberFilter, FlightTimeFilter } from "../../filters/flights/types";
import { SortingMode, SortingOptions, TableBeingSorted } from "../../sorting/commonTypes";

interface SeperatedFilters {
    dateAndTimeFilters: FlightDateAndTimeFilter[],
    timeFilters: FlightTimeFilter[],
    numberFilters: FlightNumberFilter[],
    booleanFilters: FlightBooleanFilter[]
}

interface SortDto {
    sort?: {
      orderType: string,
      parameter: string
    }
  }

export const mapFlightFilters = (filters: FlightFilter[]): SeperatedFilters => {
    const dateAndTimeFilters: FlightDateAndTimeFilter[] = filters.filter(f => f.type === FilterType.DateAndTime && f.value !== "") as FlightDateAndTimeFilter[];
    const numberFilters: FlightNumberFilter[] = filters.filter(f => f.type === FilterType.Number &&
        f.value !== undefined &&
        f.value !== 0) as FlightNumberFilter[]
    const booleanFilters: FlightBooleanFilter[] = filters.filter(f => f.type === FilterType.Boolean && f.value !== undefined) as FlightBooleanFilter[]
    const timeFilters: FlightTimeFilter[] = filters.filter(f => f.type === FilterType.Time && f.value !== "") as FlightTimeFilter[]

    return {
        dateAndTimeFilters: dateAndTimeFilters,
        timeFilters,
        numberFilters,
        booleanFilters
    }
}

export const mapFlightSorting = (sorting: SortingOptions): SortDto => {
    if(sorting.mode === SortingMode.UNSORTED || sorting.table !== TableBeingSorted.FLIGHTS) return {}
  
    return {
      sort: {
        orderType: sorting.mode,
        parameter: sorting.key || ""
      }
    }
}