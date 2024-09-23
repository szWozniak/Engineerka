import { DroneParameter } from "../../../filters/types";

interface props{
    label: string
    parameter: DroneParameter,
    value: string,
    onChange: (property: string, value: string) => void,
}

const TextFilterField: React.FC<props> = ({label, parameter, value, onChange}) => {
    return(
        <div className="filterContent">
            {label}
            <input type="text" onChange={(e) => onChange(parameter, e.target.value)} value={value} className="textFilter"/>
        </div>
    )
}

export default TextFilterField;