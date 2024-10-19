import React from 'react';
import useRefreshKey from '../../../../../common/useRefreshKey';
import { useTranslation } from 'react-i18next';
import TextFilterField from '../../TextFilter';

interface Props{
    minValue: string,
    maxValue: string,
    onMinValueChange: (value: string) => void
    onMaxValueChange: (value: string) => void
    onMinValueReset: () => void
    onMaxValueReset: () => void
}

const DateFilter: React.FC<Props> = (
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
            <TextFilterField
                label={`${t("details.flight.startDate")}`}
                value={minValue}
                onChange={onMinValueChange}
                onReset={resetMinValue}
            />
            <TextFilterField
                label={`${t("details.flight.endDate")}`}
                value={maxValue}
                onChange={onMaxValueChange}
                onReset={resetMaxValue}
            />
        </div>
    );
};

export default DateFilter;