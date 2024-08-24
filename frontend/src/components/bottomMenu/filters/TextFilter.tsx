interface props{
    label: string
    property: string, //change to be a key of Drone
    value: string,
    onChange: (property: string, value: string) => void,
}

const TextFilterField: React.FC<props> = ({label, property, value, onChange}) => {
    return(
        <div className="filterContent">
            {label}
            <input type="text" onChange={(e) => onChange(property, e.target.value)} value={value} className="textFilter"/>
        </div>
    )
}

export default TextFilterField;