import React, { useState, useContext } from 'react';
import { SortingMode } from '../commonTypes';
import { AppContext } from "../../context/AppContext";

const useSorting = () => {
  const {sorting: { sortingMode, sortingKey, setSortingMode, setSortingKey }} = useContext(AppContext);

  const changeSortingOptions = (key: string | null, mode: SortingMode) => {
    setSortingKey(key)
    setSortingMode(mode)
  }

  const onSortableColumnClicked = (dataKey: string) => {
    if(sortingMode === SortingMode.UNSORTED || sortingKey !== dataKey) 
      return changeSortingOptions(dataKey, SortingMode.ASC)
    if(sortingMode === SortingMode.ASC) 
      return changeSortingOptions(dataKey, SortingMode.DESC)
    return changeSortingOptions(null, SortingMode.UNSORTED)
  }

  return { 
    sortingOptions: {
      mode: sortingMode,
      key: sortingKey,
    },
    onSortableColumnClicked
  }
};

export default useSorting;