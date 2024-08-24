import React, { useContext, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { AppContext } from '../../context/AppContext';
import BigTable from './bigTable/BigTable';
import FilterSection from './filters/FilterSection';

const BottomMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { drones } = useContext(AppContext)

  return (
    <div className={`bottomMenu ${isOpened && 'opened'}`}>
      <div className="shadowArea" onClick={() => setIsOpened(prev => !prev)}>
        {isOpened ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      <FilterSection/>
      <BigTable drones={drones}/>
      
    </div>
  );
};

export default BottomMenu;