import React from 'react';

interface Props{
    label: string,
    value: number | undefined,
    onChange: (value: number | undefined) => void
}

const NumberFilter: React.FC<Props> = ({label, value, onChange}) => {
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
            <input type="number" onChange={(e) => changeValue(e.target.value)} value={value} className="concreteFilter"/> 
        </div>
    );
};

export default NumberFilter;