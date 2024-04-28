import React, { useState } from 'react';
import { MapDrone } from '../../hooks/useDrones';
import { CloseIcon } from '../icons/CloseIcon';
import MenuDropdown from './MenuDropdown';

interface props {
  selectedDrone: MapDrone | null,
  onDebugClick: () => void,
  onUpdateClick: () => void,

}

const Sidebar: React.FC<props> = ({ selectedDrone, onDebugClick, onUpdateClick }) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [openedMenu, setOpenedMenu] = useState<number | null>(null);
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
          <div>Selected drone: {selectedDrone.id}</div>
          <div>Latitude: <b>{selectedDrone.position[0]}</b></div>
          <div>Longtitude: <b>{selectedDrone.position[1]}</b></div>
          <div>Direction: <b>{selectedDrone.orientation[1]}</b></div>
          <div>Slope: <b>{selectedDrone.orientation[2]}</b></div>
          <button onClick={onUpdateClick}>Update location</button>
        </div>}
      </div>
      <div className="container">
        Footer
      </div>
    </div>
  );
};

export default Sidebar;