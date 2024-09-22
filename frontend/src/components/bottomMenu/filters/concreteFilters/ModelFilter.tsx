import React from 'react';
import TextFilterField from '../TextFilter';

interface Props{
    value: string,
    onChange: (value: string) => void
}

const ModelFilter: React.FC<Props> = ({value, onChange}) => {
    return (
        <TextFilterField 
            label="Model"
            onChange={onChange}
            value={value}
        />
    );
};

export default ModelFilter;