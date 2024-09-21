import { useContext } from "react";
import { DroneFlight } from "../../../drones/types";
import { AppContext } from "../../../context/AppContext";


const FlightsTable = () => {  
  const { tableSelectedDroneFlights } = useContext(AppContext)
  
  return (
    <table className="droneTable">
      <thead>
        <tr>
          <th>Data Startu</th>
          <th>Data Lądowania</th>
          <th>Czas lotu</th>
        </tr>
      </thead>
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
          </tr>
        )
      })}
    </table>
  )
}

export default FlightsTable;