import React from 'react';
import { useTranslation } from 'react-i18next';
import TextFilterField from '../../TextFilter';

interface Props{
    value: string,
    onChange: (value: string) => void
    onReset: () => void
}

const RegistrationNumberFilter: React.FC<Props> = ({value, onChange, onReset}) => {
    const { t } = useTranslation();

    return (
        <TextFilterField 
            label={t("details.drone.registration")}
            onChange={onChange}
            value={value}
            onReset={onReset}
            testId="registration-filter"
        />
    );
};

export default RegistrationNumberFilter;