import React from 'react';
import { useTranslation } from 'react-i18next';
import useRefreshKey from '../../../../../common/useRefreshKey';
import DateAndTimeFilter from '../../DateAndTimeFilter';

interface Props{
    minValue: string,
    maxValue: string,
    onMinValueChange: (value: string) => void
    onMaxValueChange: (value: string) => void
    onMinValueReset: () => void
    onMaxValueReset: () => void
}

const EndDateTimeFilter: React.FC<Props> = ({minValue,
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
            <DateAndTimeFilter
                label={`${t("details.flight.endDate")} (${t("filters.min")})`}
                value={minValue}
                onChange={onMinValueChange}
                onReset={resetMinValue}
            />
            <DateAndTimeFilter
                label={`${t("details.flight.endDate")} (${t("filters.max")})`}
                value={maxValue}
                onChange={onMaxValueChange}
                onReset={resetMaxValue}
            />
        </div>
    );
};

export default EndDateTimeFilter;