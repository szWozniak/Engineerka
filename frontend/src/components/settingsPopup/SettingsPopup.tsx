import React, { useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

interface Props{
  setViewMode: (viewMode: "2d" | "3d") => void;
}

const SettingsPopup: React.FC<Props> = ({
  setViewMode
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <>
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
        </div>
      )}
    </>
  );
};

export default SettingsPopup;