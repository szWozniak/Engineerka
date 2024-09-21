import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

const FlightTracking = () => {
  const { tableSelectedDroneFlights, setTableSelectedDroneRegistration, setTrackedFlight } = useContext(AppContext)
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            setTableSelectedDroneRegistration(null)
            setTrackedFlight(null)
          }}
        >✈️ Powrót do listy dronów</button>
        
        <button
          onClick={() => {
            setTrackedFlight(null)
          }}
        >📋 Powrót do listy lotów</button>
      </div>
      
    </div>
  );
};

export default FlightTracking;