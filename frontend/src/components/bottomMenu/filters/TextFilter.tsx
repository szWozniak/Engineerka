import { IoClose } from "react-icons/io5";

interface props{
  label: string
  value: string,
  onChange: (value: string) => void,
  onReset: () => void,
  testId?: string
}

const TextFilterField: React.FC<props> = ({label, value, onChange, onReset, testId}) => {
  return(
    <div className="filterContent">
      {label}
      <div className="actionContainer">
        <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="concreteFilter" data-testid={testId}/>
        <button className="clear-icon" onClick={onReset}>
          <IoClose />
        </button>
      </div>
    </div>
  )
}

export default TextFilterField;