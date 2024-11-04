import React, { useState, useContext } from 'react';
import { SortingMode, SortingTable } from '../commonTypes';
import { AppContext } from "../../context/AppContext";

const useSorting = () => {
  const { sorting: { 
    sortingMode, sortingKey, sortingTable, 
    setSortingMode, setSortingKey, setSortingTable 
  }} = useContext(AppContext);

  const changeSortingOptions = (key: string | null, mode: SortingMode) => {
    setSortingKey(key)
    setSortingMode(mode)
  }

  const onSortableColumnClicked = (dataKey: string, table: SortingTable) => {
    setSortingTable(table)
    
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
      table: sortingTable
    },
    onSortableColumnClicked
  }
};

export default useSorting;