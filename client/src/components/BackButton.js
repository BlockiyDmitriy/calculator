import React, { useContext } from 'react';
import { NumberContext } from './NumberProvider';

const RemoveButton = () => {
    const { handleBackButton } = useContext(NumberContext);
    return (
        <button type="button" onClick={() => handleBackButton()}>
            &#8592;
        </button>
    );
};

export default RemoveButton;