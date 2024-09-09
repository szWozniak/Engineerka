import { Filter, FilterType, NumberFilter, TextFilter } from "../../filters/types";


interface SeperatedFilters {
    textFilters: TextFilter[],
    numberFilters: NumberFilter[]
}

const mapFilters = (filters: Filter[]): SeperatedFilters => {
    //ok so webpack has some bug probably or something and it does not recognize discriminated unions
    const textFilters: TextFilter[] = filters.filter(f => f.type === FilterType.Text) as TextFilter[];
    const numberFilters: NumberFilter[] = filters.filter(f => f.type === FilterType.Number) as NumberFilter[];

    return {
        textFilters,
        numberFilters
    }
}

export default mapFilters;