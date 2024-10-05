import React, { useState } from 'react';
import { Drone } from '../../drones/types'
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';
import useDrones from '../../drones/useCases/useDrones';

interface Props{
  toggleFiltersVisibility: () => void;
}

const Sidebar: React.FC<Props> = ({ toggleFiltersVisibility }) => {

  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);
  const {flyingDrones, selectedDrone, selectDrone} = useDrones();

  const renderViewChangeButtons = () => {
    if (selectedDrone) {
      return (<button className="sidebarButton" onClick={() => selectDrone(null)}>Reset selection</button>)
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
          <h3>{t("general.menu")}</h3>
          <MenuDropdown
            label={t("general.filters")}
            opened={openedMenu === 1}
            setOpened={toggleFiltersVisibility}
          />
          <MenuDropdown
            label={t("general.flyingDrones")}
            opened={openedMenu === 2}
            setOpened={(opened) => {
              opened ? setOpenedMenu(2) : setOpenedMenu(null)
            }}
          />
          {openedMenu === 2 && <div className="droneEntries">
            {flyingDrones?.map((drone: Drone, index) => (
              <div key={index} className="droneEntry" onClick={() => {
                selectDrone(drone.registrationNumber)
              }}>
                <span>{drone.registrationNumber} </span>
                <span className="extraLabel">{drone.type}</span>
              </div>
            ))}
          </div>} 
        </div>
        <div className="container">
          {selectedDrone && <div>
            <div>{t("general.selectedDrone")}: {selectedDrone.registrationNumber}</div>
            <div>{t("geo.latitude")}: <b>{selectedDrone.currentPosition.latitude.toFixed(4)}</b></div>
            <div>{t("geo.longitude")}: <b>{selectedDrone.currentPosition.longitude.toFixed(4)}</b></div>
            <div>{t("geo.direction")}: <b>{selectedDrone.heading}</b></div>
            <div>{t("geo.altitude")}: <b>{selectedDrone.currentPosition.altitude}</b></div>
            {renderViewChangeButtons()}
          </div>}
        </div>  
      </div>
      <div className="container">
        {t("general.domain")} &copy; 2024
      </div>
    </div>
  );
};

export default Sidebar;