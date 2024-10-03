import React from 'react';
import NumberFilter from '../NumberFilter';
import { useTranslation } from 'react-i18next';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
}

const LatitudeFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange}) => {
    const { t } = useTranslation();

    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label={`${t("geo.latitude")} (${t("filters.min")})`}
                value={minValue}
                onChange={onMinValueChange}
            />
            <NumberFilter
                label={`${t("geo.latitude")} (${t("filters.max")})`}
                value={maxValue}
                onChange={onMaxValueChange}
            />
        </div>
    );
};

export default LatitudeFilter;