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

const AltitudeFilter: React.FC<Props> = ({minValue,
        maxValue,
        onMinValueChange,
        onMaxValueChange,
        onMaxValueReset,
        onMinValueReset
    }) => {
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
                label={`${t("geo.altitude")} (${t("filters.min")})`}
                value={minValue}
                onChange={(value) => {
                    if (value !== undefined && value < 0) {return}
                    onMinValueChange(value)
                }}
                onReset={resetMinValue}
                testId="altitude-filter-min"
            />
            <NumberFilter
                label={`${t("geo.altitude")} (${t("filters.max")})`}
                value={maxValue}
                onChange={(value) => {
                    if (value !== undefined && value < 0) {return}
                    onMaxValueChange(value)
                }}
                onReset={resetMaxValue}
                testId="altitude-filter-max"
            />
        </div>
    );
};

export default AltitudeFilter;