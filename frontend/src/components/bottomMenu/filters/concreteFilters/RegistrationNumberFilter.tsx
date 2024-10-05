import React from 'react';
import TextFilterField from '../TextFilter';
import { useTranslation } from 'react-i18next';

interface Props{
    value: string,
    onChange: (value: string) => void
}

const RegistrationNumberFilter: React.FC<Props> = ({value, onChange}) => {
    const { t } = useTranslation();

    return (
        <TextFilterField 
            label={t("details.registration")}
            onChange={onChange}
            value={value}
        />
    );
};

export default RegistrationNumberFilter;