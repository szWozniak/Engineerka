import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

type MenuDropdownProps = {
  label: string
  opened: boolean
  disabled?: boolean
  setOpened: (opened: boolean) => void
}

const MenuDropdown = ({
  label,
  opened,
  disabled = false,
  setOpened
}: MenuDropdownProps) => {
  return (
    <div className={`menuDropdown${disabled ? " disabled" : ""}`} onClick={() => {
      setOpened(!opened)
    }}>
      {opened ? <ArrowDownIcon /> : <ArrowRightIcon />}
      {label}
    </div>
  );
};

export default MenuDropdown;