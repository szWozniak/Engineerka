import { useContext, useState } from "react";
import { AppContext, Filter, FilterType, NumberFilter, TextFilter } from "../../../context/AppContext"
import TextFilterField from "./TextFilter"

const DefaultFiltersState: Filter[] = [
    {
        type: FilterType.Text,
        parameter: "registrationNumber",
        value: "",
        comparisonType: "Equals"
    }
]

const FilterSection: React.FC = () => {
    const [filtersState, SetFiltersState] = useState<Filter[]>(DefaultFiltersState);

    const {applyFilters} = useContext(AppContext);

    const getTextFilter = (parameter: string): TextFilter => {
        const searchedFilter = filtersState.find(f => f.parameter === parameter);
        if (searchedFilter === undefined || searchedFilter.type !== FilterType.Text){
            throw new Error("Invalid parameter")
        }

        return searchedFilter;
    }

    const getNumberFilter = (parameter: string): NumberFilter => {
        const searchedFilter = filtersState.find(f => f.parameter === parameter);
        if (searchedFilter === undefined || searchedFilter.type !== FilterType.Number){
            throw new Error("Invalid parameter")
        }

        return searchedFilter;
    }
    const onTextFilterChange = (parameter: string, value: string) => {
        SetFiltersState(prev => prev.map(f => {
            if (f.parameter === parameter && f.type === FilterType.Text){
                f.value = value
            }
            return f;
        }))

    }

    return(
        <div className='content' style={{"height": "180px"}}>
            Filtry
            <div className="filters">
                <TextFilterField label="Registration Number"
                property="registrationNumber"
                onChange={onTextFilterChange}
                value={getTextFilter("registrationNumber").value}/>
            </div>
            <button onClick={() => applyFilters(filtersState)}>Zastosuj</button>
        </div>
    )
}

export default FilterSection