import React from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { SortingMode, TableBeingSorted } from '../../../sorting/commonTypes';
import useSorting from '../../../sorting/useCases/useSorting';

export interface SortableHeaderProps {
  label: string
  dataKey: string
  table?: TableBeingSorted
  rowSpan?: number
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  dataKey,
  table = TableBeingSorted.NONE,
  rowSpan = 1
}) => {
  const {sortingOptions: { mode, key }, onSortableColumnClicked} = useSorting();
  let sortcontrolsClass = "sortControls"

  if(mode === SortingMode.ASC && key === dataKey) sortcontrolsClass += " sortAsc"
  if(mode === SortingMode.DESC && key === dataKey) sortcontrolsClass += " sortDesc"

  return (
    <th rowSpan={rowSpan}>
      <div className="sortableColumn" onClick={() => onSortableColumnClicked(dataKey, table)}>
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