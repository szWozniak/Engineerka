import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import BigTable from './bigTable/BigTable';
import FlightsTable from './flightsTable/FlightsTable';
import FilterSection from './filters/FilterSection';
import FlightStatusPanel from './flightsTable/FlightStatusPanel';
import { useTranslation } from 'react-i18next';
import { NumberFilter, NumberFilterKey, TextFilter, TextFilterKey } from '../../filters/types';
import useFlights from '../../flights/useCases/useFlights';

interface Props{
  areFiltersOpen: boolean
  getTextFilter: (filterKey: TextFilterKey) => TextFilter,
  getNumberFilter: (filterKey: NumberFilterKey) => NumberFilter,
  onNumberFilterChange: (filterKey: NumberFilterKey, value: number | undefined) => void,
  onTextFilterChange: (filterKey: TextFilterKey, value: string) => void,
  applyFilters: () => void
}

const BottomMenu: React.FC<Props> = ({
  areFiltersOpen,
  applyFilters,
  getNumberFilter,
  getTextFilter,
  onNumberFilterChange,
  onTextFilterChange
}) => {
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false)
  const {detailedFlight, flightsSummaries} = useFlights()

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

  const rednerFlightTrackingView = () => (
    <>
      <span>Śledzenie lotu drona {flightsSummaries.droneRegistrationToShowFlightsFor}</span>
      <FlightStatusPanel
        selectDroneRegistrationToShowFlightsFor={flightsSummaries.selectDroneRegistrationToShowFlightsFor}
        selectFlightId={detailedFlight.selectFlightId}
        selectHighlightedFlightId={flightsSummaries.selectHighlightedFlightId}
        selectTrackedPoint={detailedFlight.selectTrackedPoint}
        trackedFlight={detailedFlight.trackedFlight}
        trackedPoint={detailedFlight.trackedPoint}
      />
    </>
  )

  const renderDroneFlightsView = () => (
    <>
      <span>Historia lotów dla drona {flightsSummaries.droneRegistrationToShowFlightsFor}</span>
      <FlightsTable 
        flightSummaries={flightsSummaries.flightsSummaries}
        selectDroneRegistrationToShowFlightsFor={flightsSummaries.selectDroneRegistrationToShowFlightsFor}
        selectFlightId={detailedFlight.selectFlightId}
        selectHighlightedFlightId={flightsSummaries.selectHighlightedFlightId}
      />
    </>
  )

  const renderContent = () => {
    if (detailedFlight.trackedFlight !== undefined){
      return rednerFlightTrackingView()
    }

    if (flightsSummaries.droneRegistrationToShowFlightsFor !== null){
      return renderDroneFlightsView()
    }

    return (
      <>
        <span>Lista Dronów</span>
        <BigTable />
      </>
    )
  }

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
      {areFiltersOpen && <FilterSection 
        isOpen={areFiltersOpen}
        applyFilters={applyFilters}
        getNumberFilter={getNumberFilter}
        getTextFilter={getTextFilter}
        onNumberFilterChange={onNumberFilterChange}
        onTextFilterChange={onTextFilterChange}
      />}
      <div className="content" style={{"height": size}}>
        <div className="resizer" onMouseDown={handleMouseDown}></div>
        {renderContent()}
      </div>
    </div>
  );
};

export default BottomMenu;