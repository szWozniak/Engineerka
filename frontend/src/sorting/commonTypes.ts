export enum SortingMode {
  UNSORTED = "",
  ASC = "ASC",
  DESC = "DESC"
}

export type SortingOptions = {
  key: string | null,
  mode: SortingMode,
  table: SortingTable
}

export enum SortingTable {
  NONE = "",
  DRONES = "DRONES",
  FLIGHTS = "FLIGHTS"
}