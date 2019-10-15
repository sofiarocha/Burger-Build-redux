import React from 'react';

import classes from './Button.css';

const Button = ({ children, clicked, btnType, disabled }) => (
    <button
        disabled={disabled}    
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
    >
        {children}
    </button>
);
 
export default Button;