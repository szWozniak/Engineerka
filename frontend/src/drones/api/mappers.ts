import { FilterType } from "../../filters/commonTypes";
import { DroneFilter, DroneNumberFilter, DroneTextFilter } from "../../filters/drone/types";
import { SortingMode, SortingOptions, SortingTable } from "../../sorting/commonTypes";

interface SeperatedFilters {
  textFilters: DroneTextFilter[],
  numberFilters: DroneNumberFilter[]
}

interface SeparatedSorting {
  sort?: {
    orderType: string,
    parameter: string
  }
}

export const mapDroneFilters = (filters: DroneFilter[]): SeperatedFilters => {
  //ok so webpack has some bug probably or something and it does not recognize discriminated unions
  const textFilters: DroneTextFilter[] = filters.filter(f => f.type === FilterType.Text && f.value !== "") as DroneTextFilter[];
  const numberFilters: DroneNumberFilter[] = filters.filter(f => f.type === FilterType.Number &&
    f.value !== undefined &&
    f.value !== 0) as DroneNumberFilter[];

  return {
    textFilters,
    numberFilters
  }
}

export const mapDroneSorting = (sorting: SortingOptions): SeparatedSorting => {
  if(sorting.mode === SortingMode.UNSORTED || sorting.table !== SortingTable.DRONES) return {}

  return {
    sort: {
      orderType: sorting.mode,
      parameter: sorting.key || ""
    }
  }
}