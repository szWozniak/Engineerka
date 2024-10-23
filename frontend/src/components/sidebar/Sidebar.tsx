import React, { useContext, useState } from 'react';
import { Drone } from '../../drones/types'
import MenuDropdown from './MenuDropdown';
import Settings from './Settings';
import useDrones from '../../drones/useCases/useDrones';
import { useTranslation } from 'react-i18next';
import { MdCloseFullscreen } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FiCornerDownRight } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { MapViewState } from "deck.gl"

interface Props{
  areFiltersOpened: boolean;
  toggleFiltersVisibility: () => void;
  mapViewState: MapViewState;
  setMapViewState: any;
}

const Sidebar: React.FC<Props> = ({ toggleFiltersVisibility, areFiltersOpened, mapViewState, setMapViewState }) => {
  const {t, i18n} = useTranslation();

  const [opened, setOpened] = useState<boolean>(true);
  const [openedFlyingDrones, setOpenedFlyingDrones] = useState<boolean>(false);
  const [openedLanguageMenu, setOpenedLanguageMenu] = useState<boolean>(false);
  const {flyingDrones, timestamp, selectedDrone, selectDrone} = useDrones();
  const {flights} = useContext(AppContext);

  return (
    <div className={`sidebar ${opened ? 'opened' : 'closed'}`}>
      <div className="header">
        <img className="logo" alt="logo" src={`assets/logo${!opened ? 'Small' : ''}.png`} onClick={() => !opened && setOpened(true)} />
        <button className="closeButton" onClick={() => setOpened(prev => !prev)}>
          <MdCloseFullscreen />
        </button>
      </div>
      <div className="scrollable">
        <div className="container">
          <h3>{t("general.menu")}</h3>
          <MenuDropdown
            icon={<IoFilterSharp />}
            label={t("general.filters")}
            opened={areFiltersOpened}
            disabled={flights.selectedFlightId !== null}
            onClick={toggleFiltersVisibility}
          />
          <MenuDropdown
            icon={<MdFlightTakeoff />}
            label={t("general.flyingDrones")}
            opened={openedFlyingDrones}
            onClick={() => setOpenedFlyingDrones(prev => !prev)}
          />
          {openedFlyingDrones && <div className="menuEntries">
            {flyingDrones?.map((drone: Drone, index) => (
              <div key={index} className="menuEntry" onClick={() => {
                selectDrone(drone.registrationNumber)
              }}>
                <FiCornerDownRight />
                <span>{drone.registrationNumber} </span>
                <span className="extraLabel">{drone.type}</span>
              </div>
            ))}
          </div>}
          <MenuDropdown
            icon={<MdLanguage />}
            label={t("general.language.title")}
            opened={openedLanguageMenu}
            onClick={() => setOpenedLanguageMenu(prev => !prev)}
          />
          {openedLanguageMenu && <div className="menuEntries">
            <div className="menuEntry languageEntry" onClick={() => {
              i18n.changeLanguage("pl")
            }}>
              <FiCornerDownRight /> <img src={`https://flagsapi.com/PL/shiny/64.png`} /> <span>{t("general.language.polish")}</span>
            </div>
            <div className="menuEntry languageEntry" onClick={() => {
              i18n.changeLanguage("en")
            }}>
              <FiCornerDownRight /> <img src={`https://flagsapi.com/GB/shiny/64.png`} /> <span>{t("general.language.english")}</span>
            </div>
          </div>}
        </div>
        <Settings 
          mapViewState={mapViewState}
          setMapViewState={setMapViewState}
        />
        {selectedDrone && (<div className="container selectedDrone">
          <button className="closeButton" onClick={() => selectDrone(null)}>
            <IoClose />
          </button>
          <h3>{t("general.headers.info")}</h3>
          <div>
            <div>{t("details.drone.registration")}: <b>{selectedDrone.registrationNumber}</b></div>
            <div>{t("geo.latitude")}: <b>{selectedDrone.currentPosition.latitude.toFixed(4)}</b></div>
            <div>{t("geo.longitude")}: <b>{selectedDrone.currentPosition.longitude.toFixed(4)}</b></div>
            <div>{t("geo.direction")}: <b>{selectedDrone.heading}</b></div>
            <div>{t("geo.altitude")}: <b>{selectedDrone.currentPosition.altitude}</b></div>
          </div>
        </div>)}
      </div>
      <footer className="container">
        <span>{t("general.domain")} &copy; 2024</span>
        <span className="recordUpdate">{t("general.recordUpdate")}: {timestamp?.date} {timestamp?.time}</span>
      </footer>
    </div>
  );
};

export default Sidebar;