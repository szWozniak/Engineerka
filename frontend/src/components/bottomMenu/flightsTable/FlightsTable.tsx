import { useContext, useState } from "react";
import { DroneFlight } from "../../../drones/types";
import { AppContext } from "../../../context/AppContext";


const FlightsTable = () => {  
  const { tableSelectedDroneFlights, setTableSelectedDroneRegistration, setTrackedFlight } = useContext(AppContext)
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            setTableSelectedDroneRegistration(null)
          }}
        >✈️ Powrót do listy dronów</button>
      </div>
      <table className="droneTable">
        <thead>
          <tr>
            <th>Data Startu</th>
            <th>Data Lądowania</th>
            <th>Czas lotu</th>
            <th>Śr. Prędkość</th>
            <th>Przewyższenie</th>
            <th>Dystans</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tableSelectedDroneFlights?.map((flight: DroneFlight, index) => {
            return (
              <tr key={index}>
                <td>
                  {flight?.startDate}<br />
                  <span className="time">{flight?.startTime}</span>
                </td>
                <td>
                  {flight?.endDate}<br />
                  <span className="time">{flight?.endTime}</span>
                </td>
                <td>
                  {flight?.duration}
                </td>
                <td>
                  {flight?.averageSpeed?.toFixed(2) + " km/s"}
                </td>
                <td>
                  {flight?.elevationGain + "m"}
                </td>
                <td>
                  {flight?.distance?.toFixed(4) + "km"}
                </td>
                <td>
                <button 
                  onClick={() => {
                    setTrackedFlight(flight)
                  }}
                  title="Podgląd lotu"
                >🔍</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FlightsTable;