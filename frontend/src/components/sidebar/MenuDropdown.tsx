import { useState } from 'react';

type MenuDropdownProps = {
  label: string
  icon: JSX.Element
  opened: boolean
  onClick: () => void
}

const MenuDropdown = ({
  label,
  icon,
  opened,
  onClick
}: MenuDropdownProps) => {
  return (
    <div className={`menuDropdown${opened ? " menuActive" : ""}`} onClick={onClick}>
      {icon}
      <span className="label">{label}</span>
    </div>
  );
};

export default MenuDropdown;