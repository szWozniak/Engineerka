import React from 'react';

interface Props {
  value: boolean,
  label: string,
  onChange: (value: boolean) => void,
}

const Toggle: React.FC<Props> = ({value, label, onChange}) => {
    return (
      <div className='toggleContainer'>
        <span className="toggle-label">{label}</span> 
        <label className="switch">
          <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}/>
          <span className="slider"></span>
        </label>
      </div>
    );
};

export default Toggle;