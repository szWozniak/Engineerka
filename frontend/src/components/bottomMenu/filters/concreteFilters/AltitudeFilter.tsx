import React from 'react';
import NumberFilter from '../NumberFilter';
import { useTranslation } from 'react-i18next';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
}

const AltitudeFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange}) => {
    const { t } = useTranslation();

    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label={`${t("geo.altitude")} (${t("filters.min")})`}
                value={minValue}
                onChange={(value) => {
                    if (value !== undefined && value < 0) {return}
                    onMinValueChange(value)
                }}
            />
            <NumberFilter
                label={`${t("geo.altitude")} (${t("filters.max")})`}
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