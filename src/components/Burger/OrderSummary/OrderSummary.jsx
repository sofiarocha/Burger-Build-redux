import React from 'react';

import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, purchaseCancel, purchaseContinue, totalPrice }) => {
    const ingredientsSummary = Object.keys(ingredients).map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{ textTransform: "capitalize" }}>{ingredient}</span>: {ingredients[ingredient]}
            </li>
        );
    })
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {totalPrice}€</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}
 
export default OrderSummary;