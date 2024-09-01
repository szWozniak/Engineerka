import { useEffect } from "react";
import { Drone, DroneBase } from "../../../drones/types";

interface props {
  drones: Drone[] | undefined
  allDrones: DroneBase[] | undefined
}

const BigTable: React.FC<props> = ({drones, allDrones}) => {  
  
  return (
    <div className="content" style={{"height": "230px"}}>
      Lista Dronów
      <table className="droneTable">
        <thead>
          <tr>
            <th rowSpan={2}>Nr. rejestracyjny</th>
            <th colSpan={3}>Dane geograficzne</th>
            <th rowSpan={2}>Operator</th>
            <th rowSpan={2}>Model</th>
            <th rowSpan={2}>Typ drona</th>
          </tr>
          <tr>
            <th>Szerokość</th>
            <th>Długość</th>
            <th>Wysokość</th>
          </tr>
        </thead>
        {allDrones?.map((drone: DroneBase, index) => {
          const flyingDrone = drones?.find(d => d.registrationNumber === drone.registrationNumber)

          return (
            <tr key={index} className="droneEntry" >
              <td>{drone.registrationNumber} </td>
              {flyingDrone ? <>
                <td>{flyingDrone?.currentPosition?.latitude?.toFixed(4)}</td>
                <td>{flyingDrone?.currentPosition?.longitude?.toFixed(4)}</td>
                <td>{flyingDrone?.currentPosition?.altitude}</td>
              </> : <td colSpan={3}>b/d
                </td>}
              <td>{drone.operator} </td>
              <td>{drone.model} </td>
              <td className="extraLabel">{drone.type}</td>
            </tr>
            )
        })}
      </table>
    </div>
  )
}

export default BigTable;