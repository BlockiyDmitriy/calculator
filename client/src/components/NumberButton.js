import React, { useContext } from 'react';
import { NumberContext } from './NumberProvider';

const NumberButton = ({ buttonValue }) => {
  const { handleSetDisplayValue } = useContext(NumberContext);
  return (
    <button type='button' class="column number-button" onClick={() => handleSetDisplayValue(buttonValue)}>
      {buttonValue}
    </button>
  );
};

export default NumberButton;