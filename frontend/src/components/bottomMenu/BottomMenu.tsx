import React, { useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { AppContext } from '../../context/AppContext';
import BigTable from './bigTable/BigTable';
import FlightsTable from './flightsTable/FlightsTable';
import FilterSection from './filters/FilterSection';
import FlightStatusPanel from './flightsTable/FlightStatusPanel';
import { useTranslation } from 'react-i18next';

const BottomMenu = () => {
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false)
  const { areFiltersOpened, tableSelectedDroneRegistration, trackedFlight } = useContext(AppContext)

  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)
  const [size, setSize] = useState(430)

  const isResizing = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true
    setStartY(e.clientY)
    setStartHeight(size)
    document.body.style.cursor = 'ns-resize'
  }

  const handleMouseUp = () => {
    if(isResizing.current) {
      isResizing.current = false
      document.body.style.cursor = ''
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if(isResizing.current) {
      setSize(window.innerHeight - e.clientY)
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [])

  return (
    <div 
      className={`bottomMenu ${isOpened && 'opened'}`}
      style={{"transform": `translateY(${isOpened ? 0 : (size + 20)}px)`}}
    >
      <div 
        className="shadowArea" 
        style={{"height": size }} 
        onClick={() => setIsOpened(prev => !prev)}
      >
        {isOpened ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      {areFiltersOpened && <FilterSection isOpen={areFiltersOpened}/>}
      <div className="content" style={{"height": size}}>
        <div className="resizer" onMouseDown={handleMouseDown}></div>
        {trackedFlight ? <span>{t("general.headers.tracking")} {tableSelectedDroneRegistration}</span> : 
          (tableSelectedDroneRegistration 
            ? <span>{t("general.headers.history")} {tableSelectedDroneRegistration}</span> 
            : <span>{t("general.headers.list")}</span>)}
        {trackedFlight ? <FlightStatusPanel /> : tableSelectedDroneRegistration ? <FlightsTable /> : <BigTable />}
      </div>
    </div>
  );
};

export default BottomMenu;