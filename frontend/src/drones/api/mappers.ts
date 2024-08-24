import { Filter, FilterType, NumberFilter, TextFilter } from "../../context/AppContext";

interface SeperatedFilters {
    textFilters: TextFilter[],
    numberFilters: NumberFilter[]
}

const mapFilters = (filters: Filter[]): SeperatedFilters => {
    const textFilters = filters.filter(f => f.type === FilterType.Text);
    const numberFilters = filters.filter(f => f.type === FilterType.Number);

    return {
        textFilters,
        numberFilters
    }
}

export default mapFilters;