import { useState } from "react"
import { Filter } from "../types"

const useApplyFilters = (): {
    filters: Filter[],
    applyFilters: (filters: Filter[]) => void
} => {
    const [filters, setFilters] = useState<Filter[]>([])

    const applyFilters = (curFilters: Filter[]) => setFilters(curFilters
        .filter(f => f.value !== "")
        .map(f => structuredClone(f))
    )

    return {
        filters,
        applyFilters
    }
}

export default useApplyFilters;