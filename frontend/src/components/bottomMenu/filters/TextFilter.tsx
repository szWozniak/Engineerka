import { FilterParameter } from "../../../filters/types";

interface props{
    label: string
    value: string,
    onChange: (value: string) => void,
}

const TextFilterField: React.FC<props> = ({label, value, onChange}) => {
    return(
        <div className="filterContent">
            {label}
            <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="concreteFilter"/>
        </div>
    )
}

export default TextFilterField;