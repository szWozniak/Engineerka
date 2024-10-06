import { useState } from 'react';

type MenuDropdownProps = {
  label: string
  icon: JSX.Element
  onClick: () => void
}

const MenuDropdown = ({
  label,
  icon,
  onClick
}: MenuDropdownProps) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className={`menuDropdown${opened ? " menuActive" : ""}`} onClick={() => {
      setOpened(prev => !prev);
      onClick();
    }}>
      {icon}
      <span className="label">{label}</span>
    </div>
  );
};

export default MenuDropdown;