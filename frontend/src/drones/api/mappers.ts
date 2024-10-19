import { DroneFilter, FilterType, DroneNumberFilter, DroneTextFilter } from "../../filters/drone/types";


interface SeperatedFilters {
  textFilters: DroneTextFilter[],
  numberFilters: DroneNumberFilter[]
}

const mapFilters = (filters: DroneFilter[]): SeperatedFilters => {
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

export default mapFilters;