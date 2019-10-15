import React from 'react';

import classes from './Order.css';

const Order = ({ order }) => {
    const ingredients = [];
    for (let ing in order.ingredients) {
        ingredients.push(
            {
                name: ing,
                quantity: order.ingredients[ing],
            }
        );
    }
    const listOfIngredients = ingredients.map(ing => {
        return (
            <span 
                key={ing.name}
                className={classes.IngredientsList}
            >
                {ing.name}({ing.quantity})
            </span>);
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {listOfIngredients}</p>
            <p>Price: <strong>{order.price.toFixed(2)}€</strong></p>
        </div>
    );
}
 
export default Order;