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
            <div className="actionContainer">
                <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="concreteFilter"/>
                <span className="clear-icon" onClick={onReset}>x</span>
            </div>
        </div>
    )
}

export default TextFilterField;