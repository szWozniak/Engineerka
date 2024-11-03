export enum SortingMode {
  UNSORTED = "",
  ASC = "ASC",
  DESC = "DESC"
}

export type SortingOptions = {
  key: string | null,
  mode: SortingMode,
}