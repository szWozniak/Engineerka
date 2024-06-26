import React, { useEffect, useContext, useState } from 'react';
import { Drone } from '../../drones/types'
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';
import ViewMode from '../../types/viewMode';
import { AppContext } from '../../context/AppContext';

interface props {
  onDebugClick: () => void,
  currentView: ViewMode,
  changeCurrentView: (view: ViewMode) => void
}

const Sidebar: React.FC<props> = ({ onDebugClick, currentView, changeCurrentView }) => {

  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);
  const { drones, selectedDrone, setSelectedDroneId } = useContext(AppContext)

  const renderViewChangeButtons = () => {
    if (currentView === ViewMode.Specific) {
      return (<button className="sidebarButton" onClick={() => changeCurrentView(ViewMode.Default)}>Change to all drones view</button>)
    }

    if (currentView === ViewMode.Default) {
      return (<button className="sidebarButton" onClick={() => changeCurrentView(ViewMode.Specific)}>Change to specific drone view</button>)
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
      <div className="container">
        <h3>Menu</h3>
        <MenuDropdown
          label={"Filtry"}
          opened={openedMenu === 1}
          setOpened={(opened) => {
            opened ? setOpenedMenu(1) : setOpenedMenu(null)
          }}
        />
        <MenuDropdown
          label={"Moje Drony"}
          opened={openedMenu === 2}
          setOpened={(opened) => {
            opened ? setOpenedMenu(2) : setOpenedMenu(null)
          }}
        />
        {openedMenu === 2 && <div className="droneEntries">
          {drones?.map((drone: Drone) => (
            <div className="droneEntry" onClick={() => {
              setSelectedDroneId(drone.identification)
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
          <div>Selected drone: {selectedDrone.registrationNumber}</div>
          <div>Latitude: <b>{selectedDrone.currentPosition.latitude}</b></div>
          <div>Longtitude: <b>{selectedDrone.currentPosition.longitude}</b></div>
          <div>Direction: <b>{selectedDrone.heading}</b></div>
          <div>Altitude: <b>{selectedDrone.currentPosition.altitude}</b></div>
          {renderViewChangeButtons()}
        </div>}
      </div>
      <div className="container">
        Footer
      </div>
    </div>
  );
};

export default Sidebar;