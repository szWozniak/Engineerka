import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { MdFlightTakeoff } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import useDroneFilters from "../../../filters/drone/useCases/useDroneFilters";
import { DroneFlightSummary } from "../../../flights/types";
import useView from "../../../view/useView";
import AppView from "../../../view/types";
import useFlightFilters from "../../../filters/flights/useCases/useFlightFilters";
import SortableHeader, { SortableHeaderProps } from "../bigTable/SortableHeader";
import { TableBeingSorted } from "../../../sorting/commonTypes";

const FlightsSortableHeader = (props: SortableHeaderProps) => {
  return <SortableHeader table={TableBeingSorted.FLIGHTS} {...props} />
} 

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
  const droneFilters = useDroneFilters();
  const flightFilters = useFlightFilters();

  const clearAllFilters = () => {
    droneFilters.bulkFiltersActions.resetFilters();
    flightFilters.bulkFiltersActions.resetFilters();
  }

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
            clearAllFilters()
          }}
        ><MdFlightTakeoff /> {t("actions.backToDrones")}</button>
      </div>
      <div className="tableBox" style={{margin: 0}}>
        <table className="droneTable">
          <thead>
            <tr>
              <FlightsSortableHeader dataKey="start" label={t("details.flight.takeoff")} />
              <FlightsSortableHeader dataKey="end" label={t("details.flight.landing")} />
              <FlightsSortableHeader dataKey="duration" label={t("details.flight.time")} />
              <FlightsSortableHeader dataKey="averageSpeed" label={t("details.flight.speed")} />
              <FlightsSortableHeader dataKey="elevationGain" label={t("details.flight.elevation")} />
              <FlightsSortableHeader dataKey="distance" label={t("details.flight.distance")} />
              <th>{t("details.flight.didLand")}</th>
              <th>{t("actions.title")}</th>
            </tr>
          </thead>
          <tbody data-testid = {"flights-table"}>
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
                    {flight?.didLand ? "✅" : "❌"}
                  </td>
                  <td>
                  <button 
                    onClick={() => {
                      changeViewTo(AppView.Flight)
                      selectFlightId(flight?.id)
                      closeFilters()
                      clearAllFilters()
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