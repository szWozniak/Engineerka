import { Drone, MapDrone } from "../../../drones/types";

interface props {
    drones: Drone[] | undefined
}

const BigTable: React.FC<props> = ({drones}) => {
    return (
        <div className="content" style={{"height": "230px"}}>
            Lista Dronów
            <table className="droneTable">
                <thead>
                    <tr>
                        <th>Nr. rejestracyjny</th>
                        <th>Typ drona</th>
                    </tr>
                </thead>
                {drones?.map((drone: Drone, index) => (
                <tr key={index} className="droneEntry" >
                    <td>{drone.registrationNumber} </td>
                    <td className="extraLabel">{drone.type}</td>
                </tr>
                ))}
            </table>
        </div>
    )
}

export default BigTable;