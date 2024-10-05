import React from 'react';
import NumberFilter from '../NumberFilter';
import { useTranslation } from 'react-i18next';

interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
    onMinValueReset: () => void
    onMaxValueReset: () => void
}

const FuelFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange, onMaxValueReset, onMinValueReset}) => {
    const { t } = useTranslation();

    return (
        <div className='multipleFiltersContainer'>
            <NumberFilter
                label={`${t("details.battery")} (${t("filters.min")})`}
                value={minValue}
                onChange={onMinValueChange}
                onReset={onMinValueReset}
            />
            <NumberFilter
                label={`${t("details.battery")} (${t("filters.max")})`}
                value={maxValue}
                onChange={onMaxValueChange}
                onReset={onMaxValueReset}
            />
        </div>
    );
};

export default FuelFilter;