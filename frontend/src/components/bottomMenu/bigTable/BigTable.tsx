import { DroneBase } from "../../../drones/types";
import useDrones from "../../../drones/useCases/useDrones";
import useFlights from "../../../flights/useCases/useFlights";

const BigTable = () => {  
  const {flyingDrones, allDrones, selectDrone} = useDrones();
  const {flightsSummaries} = useFlights()
  
  return (
    <table className="droneTable">
      <thead>
        <tr>
          <th rowSpan={2}>Nr. rejestracyjny</th>
          <th colSpan={3}>Dane geograficzne</th>
          <th rowSpan={2}>Operator</th>
          <th rowSpan={2}>Paliwo</th>
          <th rowSpan={2}>Model</th>
          <th rowSpan={2}>Typ drona</th>
          <th rowSpan={2}>Akcje</th>
        </tr>
        <tr>
          <th>Szerokość</th>
          <th>Długość</th>
          <th>Wysokość</th>
        </tr>
      </thead>
      <tbody>
        {allDrones?.map((drone: DroneBase, index) => {
          const flyingDrone = flyingDrones?.find(d => d.registrationNumber === drone.registrationNumber)

          return (
            <tr key={index} className="droneEntry" >
              <td>{drone.registrationNumber} </td>
              {flyingDrone ? <>
                <td>{flyingDrone?.currentPosition?.latitude?.toFixed(4)}</td>
                <td>{flyingDrone?.currentPosition?.longitude?.toFixed(4)}</td>
                <td>{flyingDrone?.currentPosition?.altitude}</td>
              </> : <td colSpan={3}>b/d
                </td>}
              <td>
                <div className="operator">
                  <img src={`https://flagsapi.com/${drone.operator}/shiny/64.png`} />
                  {drone.operator} 
                </div>
              </td>
              <td>{flyingDrone ? <div>
                ⛽ {flyingDrone?.fuel}%
              </div> : <>b/d</>}</td>
              <td>{drone.model} </td>
              <td className="extraLabel">{drone.type}</td>
              <td>
                {flyingDrone && 
                <button 
                  onClick={() => {
                    selectDrone(drone.registrationNumber)
                  }}
                  title="Wybierz drona"
                >📌</button>}
                <button 
                  onClick={() => {
                    flightsSummaries.selectDroneRegistrationToShowFlightsFor(drone.registrationNumber)
                  }}
                  title="Pokaż loty"
                >📋</button>
              </td>
            </tr>
            )
        })}
      </tbody>
    </table>
  )
}

export default BigTable;