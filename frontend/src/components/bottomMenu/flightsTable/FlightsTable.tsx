import { useContext } from "react";
import { DroneBase, DroneFlight } from "../../../drones/types";
import { AppContext } from "../../../context/AppContext";

export type props = {
  droneFlights: DroneFlight[]
}

const FlightsTable = ({
  droneFlights
}: props) => {  
  
  return (
    <table className="droneTable">
      <thead>
        <tr>
          <th>Data Startu</th>
          <th>Data Lądowania</th>
          <th>Czas lotu</th>
        </tr>
      </thead>
      {droneFlights?.map((flight: DroneFlight, index) => {
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
              
            </td>
          </tr>
        )
      })}
    </table>
  )
}

export default FlightsTable;