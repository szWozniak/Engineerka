import React, { useEffect, useContext, useState } from 'react';
import { Drone } from '../../drones/types'
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';
import { AppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {

  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);
  const { drones, selectedDrone, setSelectedDroneRegistration } = useContext(AppContext)

  const renderViewChangeButtons = () => {
    if (selectedDrone) {
      return (<button className="sidebarButton" onClick={() => setSelectedDroneRegistration(null)}>Reset selection</button>)
    }

    return <></>
  }

  return (
    <div className={`sidebar ${opened ? 'opened' : 'closed'}`}>
      <div className="header">
        <img className="logo" alt="logo" src={`assets/logo${!opened ? 'Small' : ''}.png`} onClick={() => !opened && setOpened(true)} />
        <button className="closeButton" onClick={() => setOpened(prev => !prev)}>
          <CloseIcon />
        </button>
      </div>
      <div className="scrollable">
        <div className="container">
          <h3>DronHub</h3>
          <MenuDropdown
            label={"Moje Drony"}
            opened={openedMenu === 1}
            setOpened={(opened) => {
              opened ? setOpenedMenu(1) : setOpenedMenu(null)
            }}
          />
          {openedMenu === 1 && <div className="droneEntries">
            {drones?.map((drone: Drone, index) => (
              <div key={index} className="droneEntry" onClick={() => {
                setSelectedDroneRegistration(drone.registrationNumber)
              }}>
                <span>{drone.identification}. </span>
                <span>{drone.registrationNumber} </span>
                <span className="extraLabel">{drone.type}</span>
              </div>
            ))}
          </div>}
        </div>
        <div className="container">
          {selectedDrone && <div>
            <h3>{selectedDrone.registrationNumber}</h3>
            <div>Latitude: <b>{selectedDrone.currentPosition.latitude.toFixed(4)}</b></div>
            <div>Longtitude: <b>{selectedDrone.currentPosition.longitude.toFixed(4)}</b></div>
            <div>Direction: <b>{selectedDrone.heading}</b></div>
            <div>Altitude: <b>{selectedDrone.currentPosition.altitude}</b></div>
            {renderViewChangeButtons()}
          </div>}
        </div>
      </div>
      <div className="container">
        DronHub.pl &copy; 2024
      </div>
    </div>
  );
};

export default Sidebar;