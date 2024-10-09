import React from 'react';
import Toggle from '../../../../common/components/Toggle';
import { useTranslation } from 'react-i18next';

interface Props{
    value: string,
    onChange: (value: string) => void
}

const TypeFilter: React.FC<Props> = ({value, onChange}) => {
    const {t} = useTranslation();

    const determineToggleValue= () => {
        if (value === ""){
            return false
        }

        if (value === "Airborne"){
            return true
        }

        throw new Error("Not legal value for type parameter");
    }

    const onToggle = (value: boolean) => onChange(value ? "Airborne" : "")

    return (
        <Toggle
            label={t("details.drone.type")}
            onChange={onToggle}
            value={determineToggleValue()}
        />
    );
};

export default TypeFilter;