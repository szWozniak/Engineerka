import React, { useContext, useState } from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { AppContext } from '../../context/AppContext';
import { Drone } from '../../drones/types';

const BottomMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { drones } = useContext(AppContext)

  return (
    <div className={`bottomMenu ${isOpened && 'opened'}`}>
      <div className="shadowArea" onClick={() => setIsOpened(prev => !prev)}>
        {isOpened ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      <div className="content">
        Lista Dronów
        <table className="droneTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Nr. rejestracyjny</th>
              <th>Typ drona</th>
            </tr>
          </thead>
          {drones?.map((drone: Drone, index) => (
            <tr key={index} className="droneEntry" >
              <td>{drone.identification}. </td>
              <td>{drone.registrationNumber} </td>
              <td className="extraLabel">{drone.type}</td>
            </tr>
          ))}
        </table>
      </div>
      
    </div>
  );
};

export default BottomMenu;