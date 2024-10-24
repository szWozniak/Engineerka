import React, { useMemo } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props{
    label: string,
    value: string,
    onChange: (value: string) => void
    onReset: () => void
}

const DateAndTimeFilter: React.FC<Props> = ({
    label,
    value,
    onChange,
    onReset
}) => {
    const displayValue = useMemo(() => value, [value])
    
    return (
        <div className='filterContent'>
            {label}
            <div className='actionContainer'>
                <input type="datetime-local" onChange={(e) => onChange(e.target.value)} value={displayValue} className="concreteFilter"/>
                <button className="clear-icon" onClick={onReset}>
                    <IoClose />
                </button>
            </div>
        </div>
    );
};


export default DateAndTimeFilter;