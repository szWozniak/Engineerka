import React from 'react';
import NumberFilter from '../NumberFilter';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
}

const AltitudeFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange}) => {
    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label='Altitude (min)'
                value={minValue}
                onChange={(value) => {
                    if (value !== undefined && value < 0) {return}
                    onMinValueChange(value)
                }}
            />
            <NumberFilter
                label='Altitude (max)'
                value={maxValue}
                onChange={(value) => {
                    if (value !== undefined && value < 0) {return}
                    onMaxValueChange(value)
                }}
            />
        </div>
    );
};

export default AltitudeFilter;