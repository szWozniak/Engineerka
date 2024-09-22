import React from 'react';
import NumberFilter from '../NumberFilter';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
}

const FuelFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange}) => {
    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label='Battery (min)'
                value={minValue}
                onChange={onMinValueChange}
            />
            <NumberFilter
                label='Battery (max)'
                value={maxValue}
                onChange={onMaxValueChange}
            />
        </div>
    );
};

export default FuelFilter;