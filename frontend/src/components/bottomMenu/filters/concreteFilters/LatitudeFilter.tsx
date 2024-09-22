import React from 'react';
import NumberFilter from '../NumberFilter';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
}

const LatitudeFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange}) => {
    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label='Latitude (min)'
                value={minValue}
                onChange={onMinValueChange}
            />
            <NumberFilter
                label='Latitude (max)'
                value={maxValue}
                onChange={onMaxValueChange}
            />
        </div>
    );
};

export default LatitudeFilter;