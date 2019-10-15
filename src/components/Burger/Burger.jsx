import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const Burger = ({ ingredients }) => {
    let transformedIngredients = Object.keys(ingredients).map(keyIng => {
        return [...Array(ingredients[keyIng])].map((el, index) => {
            return <BurgerIngredient key={keyIng + index} type={keyIng} />
            });
        }
    ).reduce((prevArr, currArray) => {
        return prevArr.concat(currArray);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
 
export default Burger;