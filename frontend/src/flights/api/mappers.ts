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
        dateAndTimeFilters: dateAndTimeFilters,
        numberFilters,
        booleanFilters
    }
}

// const parseDateAndTimeToCorrectFormat = (filters: FlightDateAndTimeFilter[]): FlightDateAndTimeFilter[] => {
//     return filters.map(f => {
//         const dateAndTime = f.value.split("T")

//         let date = dateAndTime[0]
//         let time = dateAndTime[1]

//         console.log(date)
//         console.log(time)

//         const splittedDate = date.split("-")
//         date = splittedDate[2]+"-"+splittedDate[1]+"-"+splittedDate[0]
//         f.value = date+'T'+time

//         return f
//     })
// }

export default mapFlightFilters