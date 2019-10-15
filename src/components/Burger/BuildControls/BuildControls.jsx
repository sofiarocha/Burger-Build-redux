import React from 'react';

import classes from './BuildControls.css';

import BuildControl from '../BuildControl/BuildControl';

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
]

const BuildControls = ({ addIngredient, removeIngredient, disableInfo, totalPrice, purchasable, ordered }) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{totalPrice}</strong>€</p>
            {controls.map(control => (
                <BuildControl 
                    key={control.label} 
                    label={control.label}
                    added={() => addIngredient(control.type)}
                    removed={() => removeIngredient(control.type)}
                    disabled={disableInfo[control.type]}
                />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={ordered}
            >
                ORDER NOW
            </button>
        </div>
    )   
}
 
export default BuildControls;