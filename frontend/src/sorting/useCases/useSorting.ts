import React, { useState } from 'react';
import { SortingMode } from '../commonTypes';

const useSorting = () => {
  const [sortingMode, setSortingMode] = useState<SortingMode>(SortingMode.UNSORTED)
  const [sortingKey, setSortingKey] = useState<string | null>(null)

  const changeSortingOptions = (key: string | null, mode: SortingMode) => {
    setSortingKey(key)
    setSortingMode(mode)
  }

  return { 
    sortingOptions: {
      mode: sortingMode,
      key: sortingKey,
    },
    changeSortingOptions
  }
};

export default useSorting;