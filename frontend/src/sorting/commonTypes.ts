export enum SortingMode {
  UNSORTED = "",
  ASC = "ASC",
  DESC = "DESC"
}

export type SortingOptions = {
  key: string | null,
  mode: SortingMode,
  table: TableBeingSorted
}

export enum TableBeingSorted {
  NONE,
  DRONES,
  FLIGHTS
}