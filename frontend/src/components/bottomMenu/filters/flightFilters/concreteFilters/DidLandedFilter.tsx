import React from 'react';
import Toggle from '../../../../../common/components/Toggle';
import { useTranslation } from 'react-i18next';

interface Props{
    value: boolean | undefined
    onChange: (value: boolean | undefined) => void
    onReset: () => void
}

const DidLandedFilter: React.FC<Props> = ({
    value,
    onChange,
    onReset
}) => {
    const {t} = useTranslation()

    return (
        <Toggle
            label={t("details.flight.didLanded")}
            onChange={onChange}
            value={value ?? false}
        />
    );
};

export default DidLandedFilter;