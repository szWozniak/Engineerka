import React, { useState } from 'react';
import { Drone } from '../../drones/types'
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';
import ViewMode from '../../types/viewMode';

interface props {
  selectedDrone?: Drone,
  onDebugClick: () => void,
  onUpdateClick: () => void,
  currentView: ViewMode,
  changeCurrentView: (view: ViewMode) => void
}

const Sidebar: React.FC<props> = ({ selectedDrone, onDebugClick, onUpdateClick, currentView, changeCurrentView }) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);

  const renderViewChangeButtons = () => {
    if (currentView === ViewMode.Specific){
      return (<button onClick={() => changeCurrentView(ViewMode.Default)}>Change to all drones view</button>)
    }

    if (currentView === ViewMode.Default){
      return (<button onClick={() => changeCurrentView(ViewMode.Specific)}>Change to specific drone view</button>)
    }

    return <></>
  }

  return (
    <div className={`sidebar ${opened ? 'opened' : 'closed'}`}>
      <div className="header">
        <img className="logo" src={`assets/logo${!opened ? 'Small' : ''}.png`} onClick={() => !opened && setOpened(true)} />
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
      </div>
      <div className="container">
        {selectedDrone && <div>
          <div>Selected drone: {selectedDrone.registrationNumber}</div>
          <div>Latitude: <b>{selectedDrone.currentPosition.latitude}</b></div>
          <div>Longtitude: <b>{selectedDrone.currentPosition.longitude}</b></div>
          <div>Direction: <b>{selectedDrone.heading}</b></div>
          <div>Altitude: <b>{selectedDrone.currentPosition.altitude}</b></div>
          <button onClick={onUpdateClick}>Update location</button>
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