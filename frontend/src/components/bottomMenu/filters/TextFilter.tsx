interface props{
    label: string
    value: string,
    onChange: (value: string) => void,
    onReset: () => void
}

const TextFilterField: React.FC<props> = ({label, value, onChange, onReset}) => {
    return(
        <div className="filterContent">
            {label}
            <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="concreteFilter"/>
            <span id="clearIcon" className="clear-icon" onClick={onReset}>&times;</span>
        </div>
    )
}

export default TextFilterField;