import React from 'react';
import TextFilterField from '../TextFilter';

interface Props{
    value: string,
    onChange: (value: string) => void
}

const RegistrationNumberFilter: React.FC<Props> = ({value, onChange}) => {
    return (
        <TextFilterField 
            label="Registration Number"
            onChange={onChange}
            value={value}
        />
    );
};

export default RegistrationNumberFilter;