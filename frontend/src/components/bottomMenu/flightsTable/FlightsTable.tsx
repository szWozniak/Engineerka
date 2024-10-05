import { Dispatch, SetStateAction } from "react";
import { DroneFlightSummary } from "../../../drones/types";

interface Props {
  selectHighlightedFlightId: Dispatch<SetStateAction<number | null>>,
  selectDroneRegistrationToShowFlightsFor: Dispatch<SetStateAction<string | null>>
  selectFlightId: Dispatch<SetStateAction<number | null>>
  flightSummaries: DroneFlightSummary[] | undefined
}

const FlightsTable: React.FC<Props> = ({
    selectDroneRegistrationToShowFlightsFor,
    selectFlightId,
    selectHighlightedFlightId,
    flightSummaries
  }) => { 
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            selectDroneRegistrationToShowFlightsFor(null)
            selectHighlightedFlightId(null)
            selectFlightId(null)
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
          {flightSummaries?.map((flight, index) => {
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
                  {flight?.averageSpeed?.toFixed(2) + " km/h"}
                </td>
                <td>
                  {flight?.elevationGain + "m"}
                </td>
                <td>
                  {flight?.distance?.toFixed(4) + "km"}
                </td>
                <td>
                <button 
                  onClick={() => selectFlightId(flight?.id)}
                  onMouseEnter={() => selectHighlightedFlightId(flight?.id)}
                  onMouseLeave={() => selectHighlightedFlightId(null)}
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