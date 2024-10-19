import React from 'react';
import { useTranslation } from 'react-i18next';
import useRefreshKey from '../../../../../common/useRefreshKey';
import NumberFilter from '../../NumberFilter';


interface Props{
    minValue: number | undefined,
    maxValue: number | undefined,
    onMinValueChange: (value: number | undefined) => void
    onMaxValueChange: (value: number | undefined) => void
    onMinValueReset: () => void
    onMaxValueReset: () => void
}

const LatitudeFilter: React.FC<Props> = ({minValue, maxValue, onMinValueChange, onMaxValueChange, onMaxValueReset, onMinValueReset}) => {
    const { t } = useTranslation();

    const {refreshKey, refresh} = useRefreshKey();

    const resetMinValue = () => {
        onMinValueReset()
        refresh()
    }

    const resetMaxValue = () => {
        onMaxValueReset()
        refresh()
    }

    return (
        <div className='multipleFiltersContainer' key={refreshKey}>
            <NumberFilter
                label={`${t("geo.latitude")} (${t("filters.min")})`}
                value={minValue}
                onChange={onMinValueChange}
                onReset={resetMinValue}
            />
            <NumberFilter
                label={`${t("geo.latitude")} (${t("filters.max")})`}
                value={maxValue}
                onChange={onMaxValueChange}
                onReset={resetMaxValue}
            />
        </div>
    );
};

export default LatitudeFilter;