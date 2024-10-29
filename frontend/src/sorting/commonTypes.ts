export enum SortingMode {
  UNSORTED,
  ASC,
  DESC
}

export type SortingOptions = {
  key: string | null,
  mode: SortingMode,
}