import { DroneBase } from "../../../drones/types";
import useDrones from "../../../drones/useCases/useDrones";
import useFlights from "../../../flights/useCases/useFlights";
import { useTranslation } from 'react-i18next';
import { MdBatteryCharging90 } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import useView from "../../../view/useView";
import AppView from "../../../view/types";

const BigTable = () => {  
  const { t } = useTranslation();
  const {flyingDrones, allDrones, selectDrone} = useDrones();
  const {flightsSummaries} = useFlights()
  const {changeViewTo} = useView()
  
  return (
    <div className="tableBox">
      <table className="droneTable">
        <thead>
          <tr>
            <th rowSpan={2}>{t("details.drone.registration")}</th>
            <th colSpan={3}>{t("details.drone.geoData")}</th>
            <th rowSpan={2}>{t("details.drone.operator")}</th>
            <th rowSpan={2}>{t("details.drone.battery")}</th>
            <th rowSpan={2}>{t("details.drone.model")}</th>
            <th rowSpan={2}>{t("details.drone.state")}</th>
            <th rowSpan={2}>{t("actions.title")}</th>
          </tr>
          <tr>
            <th>{t("geo.latitude")}</th>
            <th>{t("geo.longitude")}</th>
            <th>{t("geo.altitude")}</th>
          </tr>
        </thead>
        <tbody>
          {allDrones?.map((drone: DroneBase, index) => {
            const flyingDrone = flyingDrones?.find(d => d.registrationNumber === drone.registrationNumber)

            return (
              <tr key={index} className="menuEntry" >
                <td>{drone.registrationNumber} </td>
                {flyingDrone ? <>
                  <td>{flyingDrone?.currentPosition?.latitude?.toFixed(4)}</td>
                  <td>{flyingDrone?.currentPosition?.longitude?.toFixed(4)}</td>
                  <td>{flyingDrone?.currentPosition?.altitude}</td>
                </> : <td colSpan={3}>{t("details.noData")}
                  </td>}
                <td>
                  <div className="withIcon">
                    <img src={`https://flagsapi.com/${drone.operator}/shiny/64.png`} />
                    {drone.operator} 
                  </div>
                </td>
                <td>
                  <div className="withIcon">
                    {flyingDrone ? <><MdBatteryCharging90 /> {flyingDrone?.fuel}%</> 
                      : <>{t("details.noData")}</>}
                  </div>
                </td>
                <td>{drone.model} </td>
                <td className="extraLabel">{drone.type}</td>
                <td>
                  {flyingDrone && 
                  <button 
                    onClick={() => {
                      selectDrone(drone.registrationNumber)
                    }}
                    title={t("actions.selectDrone")}
                  ><FaMapMarkerAlt /></button>}
                  <button 
                    onClick={() => {
                      changeViewTo(AppView.FlightsSummary)
                      flightsSummaries.selectDroneRegistrationToShowFlightsFor(drone.registrationNumber)
                    }}
                    title={t("actions.showFlights")}
                  ><FaListUl /></button>
                </td>
              </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BigTable;