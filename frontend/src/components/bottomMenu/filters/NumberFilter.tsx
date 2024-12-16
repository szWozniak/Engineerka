import React, { useMemo } from 'react';
import { IoClose } from "react-icons/io5";

interface Props{
  label: string,
  value: number | undefined,
  onChange: (value: number | undefined) => void
  onReset: () => void
  testId?: string
}

const NumberFilter: React.FC<Props> = ({label, value, onChange, onReset, testId}) => {
  const changeValue = (value: string) => {
    let numberValue: number | undefined = Number(value)

    if (isNaN(numberValue)){
      return;
    }

    if (numberValue === 0) {
      numberValue = undefined
    }

    onChange(numberValue)
  }

  const displayValue = useMemo(() => value, [value])

  return (
    <div className="filterContent">
      {label}
      <div className="actionContainer">
        <input type="number" onChange={(e) => changeValue(e.target.value)} value={displayValue} className="concreteFilter" data-testid={testId}/>
        <button className="clear-icon" onClick={onReset}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default NumberFilter;