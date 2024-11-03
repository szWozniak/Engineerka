import React from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { SortingMode } from '../../../sorting/commonTypes';
import useSorting from '../../../sorting/useCases/useSorting';

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
  const {sortingOptions: { mode, key }, onSortableColumnClicked} = useSorting();
  let sortcontrolsClass = "sortControls"

  if(mode === SortingMode.ASC && key === dataKey) sortcontrolsClass += " sortAsc"
  if(mode === SortingMode.DESC && key === dataKey) sortcontrolsClass += " sortDesc"

  return (
    <th rowSpan={rowSpan}>
      <div className="sortableColumn" onClick={() => onSortableColumnClicked(dataKey)}>
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