import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import BigTable from './bigTable/BigTable';
import FlightsTable from './flightsTable/FlightsTable';
import FlightStatusPanel from './flightsTable/FlightStatusPanel';
import { useTranslation } from 'react-i18next';
import useFlights from '../../flights/useCases/useFlights';
import DroneFilterSection from './filters/droneFilters/DroneFilterSection';
import useView from '../../view/useView';
import AppView from '../../view/types';
import FlightFilterSection from './filters/flightFilters/FlightFilterSection';
import useDrones from '../../drones/useCases/useDrones';
import SettingsPopup from '../settingsPopup/SettingsPopup';

interface Props{
  areFiltersOpened: boolean,
  closeFilters: () => void
  setViewMode: (viewMode: "2d" | "3d") => void;
}

const BottomMenu: React.FC<Props> = ({
  areFiltersOpened,
  closeFilters,
  setViewMode
}) => {
  const { t } = useTranslation();

  const {currentView} = useView()

  const [isOpened, setIsOpened] = useState(false)
  const {detailedFlight, flightsSummaries} = useFlights()

  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)
  const [size, setSize] = useState(430)

  const isResizing = useRef(false)

  const { timestamp } = useDrones();

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
      <span><b>{t("general.headers.tracking")}</b> {flightsSummaries.droneRegistrationToShowFlightsFor}</span>
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
      <span><b>{t("general.headers.history")}</b> {flightsSummaries.droneRegistrationToShowFlightsFor}</span>
      <FlightsTable 
        flightSummaries={flightsSummaries.flightsSummaries}
        selectDroneRegistrationToShowFlightsFor={flightsSummaries.selectDroneRegistrationToShowFlightsFor}
        selectFlightId={detailedFlight.selectFlightId}
        selectHighlightedFlightId={flightsSummaries.selectHighlightedFlightId}
        closeFilters={closeFilters}
      />
    </>
  )

  const renderContent = () => {
    if(currentView === AppView.Flight)
    {
      return rednerFlightTrackingView()
    }

    if (currentView === AppView.FlightsSummary)
    {
      return renderDroneFlightsView()
    }

    return (
      <>
        <div className="bottomMenuHeader">
          <span><b>{t("general.headers.list")}</b></span>
          <span className="recordUpdate">{t("general.recordUpdate")}: {timestamp?.date} {timestamp?.time}</span>
        </div>
        <BigTable />
      </>
    )
  }

  const renderFilters = useCallback(() => {
    if (!areFiltersOpened){
      return <></>
    }

    if (currentView === AppView.Drones){
      return <DroneFilterSection/>
    }

    if (currentView === AppView.FlightsSummary){
      return <FlightFilterSection/>
    }

    return <></>
  }, [areFiltersOpened, currentView])

  const filters = useMemo(() => renderFilters(), 
  [renderFilters])

  return (
    <div className="mainContainer">
      <div 
        className={`bottomMenu ${isOpened && 'opened'}`}
        style={{"transform": `translateY(${isOpened ? 0 : size}px)`}}
      >
        <div 
          className="shadowArea" 
          style={{"height": size }} 
          onClick={() => setIsOpened(prev => !prev)}
        >
          {isOpened ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        {filters}
        <div className="content" style={{"height": size}}>
          <div className="resizer" onMouseDown={handleMouseDown}></div>
          {renderContent()}
        </div>
      </div>
      <SettingsPopup setViewMode={setViewMode} />
    </div>
  );
};

export default BottomMenu;