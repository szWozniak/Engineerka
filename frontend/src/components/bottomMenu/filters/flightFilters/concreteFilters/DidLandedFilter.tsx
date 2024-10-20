import React from 'react';

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
    return (
        <div>
            
        </div>
    );
};

export default DidLandedFilter;