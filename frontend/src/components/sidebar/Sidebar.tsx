import React, { useEffect, useContext, useState } from 'react';
import { Drone } from '../../drones/types'
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';
import { AppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {

  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);
  const { drones, filters } = useContext(AppContext)

  const renderViewChangeButtons = () => {
    if (drones.selected) {
      return (<button className="sidebarButton" onClick={() => drones.setSelected(null)}>Reset selection</button>)
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
          <h3>Menu</h3>
          <MenuDropdown
            label={"Filtry"}
            opened={openedMenu === 1}
            setOpened={filters.toggleVisibilty}
          />
          <MenuDropdown
            label={"Latające Drony"}
            opened={openedMenu === 2}
            setOpened={(opened) => {
              opened ? setOpenedMenu(2) : setOpenedMenu(null)
            }}
          />
          {openedMenu === 2 && <div className="droneEntries">
            {drones.currentlyFlyng?.map((drone: Drone, index) => (
              <div key={index} className="droneEntry" onClick={() => {
                drones.setSelected(drone.registrationNumber)
              }}>
                <span>{drone.registrationNumber} </span>
                <span className="extraLabel">{drone.type}</span>
              </div>
            ))}
          </div>}
        </div>
        <div className="container">
          {drones.selected && <div>
            <div>Selected drone: {drones.selected.registrationNumber}</div>
            <div>Latitude: <b>{drones.selected.currentPosition.latitude.toFixed(4)}</b></div>
            <div>Longtitude: <b>{drones.selected.currentPosition.longitude.toFixed(4)}</b></div>
            <div>Direction: <b>{drones.selected.heading}</b></div>
            <div>Altitude: <b>{drones.selected.currentPosition.altitude}</b></div>
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