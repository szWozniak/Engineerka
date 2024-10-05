import React from 'react';
import TextFilterField from '../TextFilter';
import { useTranslation } from 'react-i18next';

interface Props{
    value: string,
    onChange: (value: string) => void
    onReset: () => void
}

const RegistrationNumberFilter: React.FC<Props> = ({value, onChange, onReset}) => {
    const { t } = useTranslation();

    return (
        <TextFilterField 
            label={t("details.registration")}
            onChange={onChange}
            value={value}
            onReset={onReset}
        />
    );
};

export default RegistrationNumberFilter;