import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { MdFlightTakeoff } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import useDroneFilters from "../../../filters/drone/useCases/useDroneFilters";
import { DroneFlightSummary } from "../../../flights/types";
import useView from "../../../view/useView";
import AppView from "../../../view/types";

interface Props {
  selectHighlightedFlightId: Dispatch<SetStateAction<number | null>>,
  selectDroneRegistrationToShowFlightsFor: Dispatch<SetStateAction<string | null>>
  selectFlightId: Dispatch<SetStateAction<number | null>>
  closeFilters: () => void
  flightSummaries: DroneFlightSummary[] | undefined
}

const FlightsTable: React.FC<Props> = ({
    selectDroneRegistrationToShowFlightsFor,
    selectFlightId,
    selectHighlightedFlightId,
    closeFilters,
    flightSummaries
  }) => { 
  const {t} = useTranslation();
  const {bulkFiltersActions} = useDroneFilters();

  const {changeViewTo} = useView()
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            changeViewTo(AppView.Drones)
            selectDroneRegistrationToShowFlightsFor(null)
            selectHighlightedFlightId(null)
            selectFlightId(null)
          }}
        ><MdFlightTakeoff /> {t("actions.backToDrones")}</button>
      </div>
      <div className="tableBox" style={{margin: 0}}>
        <table className="droneTable">
          <thead>
            <tr>
              <th>{t("details.flight.takeoff")}</th>
              <th>{t("details.flight.landing")}</th>
              <th>{t("details.flight.time")}</th>
              <th>{t("details.flight.speed")}</th>
              <th>{t("details.flight.elevation")}</th>
              <th>{t("details.flight.distance")}</th>
              <th>{t("details.flight.didLanded")}</th>
              <th>{t("actions.title")}</th>
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
                    {flight?.didLanded ? "✅" : "❌"}
                  </td>
                  <td>
                  <button 
                    onClick={() => {
                      changeViewTo(AppView.Flight)
                      selectFlightId(flight?.id)
                      closeFilters();
                      bulkFiltersActions.resetFilters();
                    }}
                    onMouseEnter={() => selectHighlightedFlightId(flight?.id)}
                    onMouseLeave={() => selectHighlightedFlightId(null)}
                    title={t("actions.previewFlight")}
                  ><MdSearch /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FlightsTable;