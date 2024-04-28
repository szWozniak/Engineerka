import React from 'react';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

type MenuDropdownProps = {
  label: string
  opened: boolean
  setOpened: (opened: boolean) => void
}

const MenuDropdown = ({
  label,
  opened,
  setOpened
}: MenuDropdownProps) => {
  return (
    <div className="menuDropdown" onClick={() => {
      setOpened(!opened)
    }}>
      {opened ? <ArrowDownIcon /> : <ArrowRightIcon />}
      {label}
    </div>
  );
};

export default MenuDropdown;