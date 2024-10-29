import React, { useContext, useState } from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { AppContext } from '../../../context/AppContext';
import { SortingMode } from '../../../sorting/commonTypes';

interface Props{
  label: string
  dataKey: string
  rowSpan?: number
}

const SortableHeader: React.FC<Props> = ({
  label,
  dataKey,
  rowSpan = 1
}) => {
  const { sorting: 
    { 
      sortingOptions: { mode, key }, 
      changeSortingOptions
    }
  } = useContext(AppContext);

  let sortcontrolsClass = "sortControls"

  if(mode === SortingMode.ASC && key === dataKey) sortcontrolsClass += " sortAsc"
  if(mode === SortingMode.DESC && key === dataKey) sortcontrolsClass += " sortDesc"

  return (
    <th rowSpan={rowSpan}>
      <div className="sortableColumn" onClick={() => {
        if(mode === SortingMode.UNSORTED || key !== dataKey) 
          return changeSortingOptions(dataKey, SortingMode.ASC)
        if(mode === SortingMode.ASC) 
          return changeSortingOptions(dataKey, SortingMode.DESC)
        return changeSortingOptions(null, SortingMode.UNSORTED)
      }}>
        {label}

        <div className={sortcontrolsClass}>
          <TiArrowSortedUp />
          <TiArrowSortedDown />
        </div>
      </div>
    </th>
  );
};

export default SortableHeader;