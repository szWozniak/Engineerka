import { useContext } from "react";
import { DroneFlightSummary } from "../../../drones/types";
import { AppContext } from "../../../context/AppContext";
import { useTranslation } from 'react-i18next';

const FlightsTable = () => {  
  const { t } = useTranslation();

  const { tableSelectedDroneFlights, setTableSelectedDroneRegistration, setFlightsTableSelectedFlightId, setHighlightedFlightId } = useContext(AppContext)
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            setTableSelectedDroneRegistration(null)
            setHighlightedFlightId(null)
            setFlightsTableSelectedFlightId(null)
          }}
        >✈️ {t("actions.backToDrones")}</button>
      </div>
      <table className="droneTable">
        <thead>
          <tr>
            <th>{t("details.flight.takeoff")}</th>
            <th>{t("details.flight.landing")}</th>
            <th>{t("details.flight.time")}</th>
            <th>{t("details.flight.speed")}</th>
            <th>{t("details.flight.elevation")}</th>
            <th>{t("details.flight.distance")}</th>
            <th>{t("actions.title")}</th>
          </tr>
        </thead>
        <tbody>
          {tableSelectedDroneFlights?.map((flight, index) => {
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
                  onClick={() => {
                    setFlightsTableSelectedFlightId(flight?.id)
                  }}
                  onMouseEnter={() => {
                    setHighlightedFlightId(flight?.id)
                  }}
                  onMouseLeave={() => {
                    setHighlightedFlightId(null)
                  }}
                  title={t("actions.previewFlight")}
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