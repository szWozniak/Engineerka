import React from 'react';

interface Props{
    label: string,
    value: number | undefined,
    onChange: (value: number | undefined) => void
}

const NumberFilter: React.FC<Props> = ({label, value, onChange}) => {
    const changeValue = (value: string) => {
        const numberValue = Number(value)

        if (isNaN(numberValue) || numberValue < 0){
            return;
        }

        onChange(numberValue)
    }

    return (
        <div className="filterContent">
            {label}
            <input type="number" onChange={(e) => changeValue(e.target.value)} value={value === 0 ? undefined : value} className="concreteFilter"/> 
        </div>
    );
};

export default NumberFilter;