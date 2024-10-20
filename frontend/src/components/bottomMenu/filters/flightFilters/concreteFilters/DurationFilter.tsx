import React from 'react';
import { useTranslation } from 'react-i18next';
import useRefreshKey from '../../../../../common/useRefreshKey';
import TimeFilter from '../../TimeFilter';

interface Props{
    minValue: string,
    maxValue: string,
    onMinValueChange: (value: string) => void
    onMaxValueChange: (value: string) => void
    onMinValueReset: () => void
    onMaxValueReset: () => void
}

const DurationFilter: React.FC<Props> = (
    {minValue,
        maxValue,
        onMinValueChange,
        onMaxValueChange,
        onMaxValueReset,
        onMinValueReset
    }
) => {
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
            <TimeFilter
                label={`${t("details.flight.duration")} (${t("filters.min")})`}
                value={minValue}
                onChange={onMinValueChange}
                onReset={resetMinValue}
            />
            <TimeFilter
                label={`${t("details.flight.duration")} (${t("filters.max")})`}
                value={maxValue}
                onChange={onMaxValueChange}
                onReset={resetMaxValue}
            />
        </div>
    );
};

export default DurationFilter;