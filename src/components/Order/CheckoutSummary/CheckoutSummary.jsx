import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!!!</h1>
            <div className={classes.Burger}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType="Danger" clicked={checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
 
export default CheckoutSummary;