type MenuDropdownProps = {
  label: string
  icon: JSX.Element
  opened: boolean,
  disabled?: boolean,
  onClick: () => void,
  testId?: string
}

const MenuDropdown = ({
  label,
  icon,
  opened,
  disabled = false,
  onClick,
  testId
}: MenuDropdownProps) => {
  return (
    <div className={`menuDropdown${opened ? " menuActive" : ""}${disabled ? " disabled" : ""}`} onClick={!disabled ? onClick : undefined}
      data-testid={testId}
    >
      {icon}
      <span className="label">{label}</span>
    </div>
  );
};

export default MenuDropdown;