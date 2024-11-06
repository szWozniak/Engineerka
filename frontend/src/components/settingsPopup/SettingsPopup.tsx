import React, { useState, Dispatch, SetStateAction } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { MapStyle, mapStyles } from '../../map/commonTypes';

interface Props{
  setViewMode: (viewMode: "2d" | "3d") => void,
  mapStyle: MapStyle,
  setMapStyle: Dispatch<SetStateAction<MapStyle>>
}

const SettingsPopup: React.FC<Props> = ({
  setViewMode,
  mapStyle,
  setMapStyle
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div className="settingsPopup">
      <div className="settingsPopupToggle" onClick={() => setIsVisible(prev => !prev)}>
        <IoSettingsOutline />
      </div>
      {isVisible && (
        <div className="settingsPopupOverlay">
          <div>
            {t("general.viewmode")}
          </div>
          <div>
            <button className="selectView" onClick={() => setViewMode("2d")}>
              2D
            </button>
            <button className="selectView" onClick={() => setViewMode("3d")}>
              3D
            </button>
          </div>
          <div>
            Styl mapy
          </div>
          <select value={mapStyle.url} onChange={(e) => {
            const style = mapStyles.find((style: MapStyle) => style.url === e.target.value)
            if(style) setMapStyle(style)
          }}>
            {mapStyles.map((style: MapStyle) => (
              <option key={style.url} value={style.url}>{t(style.label)}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SettingsPopup;