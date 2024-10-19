type MenuDropdownProps = {
  label: string
  icon: JSX.Element
  opened: boolean,
  disabled?: boolean,
  onClick: () => void
}

const MenuDropdown = ({
  label,
  icon,
  opened,
  disabled = false,
  onClick
}: MenuDropdownProps) => {
  return (
    <div className={`menuDropdown${opened ? " menuActive" : ""}${disabled ? " disabled" : ""}`} onClick={!disabled ? onClick : undefined}>
      {icon}
      <span className="label">{label}</span>
    </div>
  );
};

export default MenuDropdown;