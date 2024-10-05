import React from 'react';

interface Props{
    label: string,
    value: number | undefined,
    onChange: (value: number | undefined) => void
    onReset: () => void
}

const NumberFilter: React.FC<Props> = ({label, value, onChange, onReset}) => {
    const changeValue = (value: string) => {
        let numberValue: number | undefined = Number(value)

        if (isNaN(numberValue)){
            return;
        }

        if (numberValue === 0) {
            numberValue = undefined
        }

        onChange(numberValue)
    }


    return (
        <div className="filterContent">
            {label}
            <div>
                <input type="number" onChange={(e) => changeValue(e.target.value)} value={value} className="concreteFilter"/>
                <span id="clearIcon" className="clear-icon" onClick={onReset}>&times;</span>
            </div>
        </div>
    );
};

export default NumberFilter;