import React from 'react';
import Toggle from '../../../../common/components/Toggle';

interface Props{
    value: string,
    onChange: (value: string) => void
}

const TypeFilter: React.FC<Props> = ({value, onChange}) => {

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
            label='Display only flying'
            onChange={onToggle}
            value={determineToggleValue()}
        />
    );
};

export default TypeFilter;