import React, { useState, useContext } from 'react';
import MenuDropdown from './MenuDropdown';
import { useTranslation } from 'react-i18next';
import { FaMapLocationDot } from "react-icons/fa6";
import { FiCornerDownRight } from "react-icons/fi";

interface Props{
  setViewMode: (viewMode: string) => any
}

const Settings: React.FC<Props> = ({setViewMode}) => {
  const { t } = useTranslation();
  const [openedViewModeMenu, setOpenedViewModeMenu] = useState<boolean>(false)

  return (
    <div className="container">
      <h3>{t("general.settings")}</h3>
      <MenuDropdown
        icon={<FaMapLocationDot />}
        label={t("general.viewmode")}
        opened={openedViewModeMenu}
        onClick={() => setOpenedViewModeMenu(prev => !prev)}
      />
      {openedViewModeMenu && <div className="menuEntries">
        <div className="menuEntry" onClick={() => setViewMode("2d")}>
          <FiCornerDownRight />
          <span>2D</span>
        </div>
        <div className="menuEntry" onClick={() => setViewMode("3d")}>
          <FiCornerDownRight />
          <span>3D</span>
        </div>
      </div>}
    </div>
  );
};

export default Settings;