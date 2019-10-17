import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: 
            const updateIngredientAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updateIngredientsStateAdd = updateObject (state.ingredients, updateIngredientAdd);
            const updateStateAdd = {
                ingredients: updateIngredientsStateAdd,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
            }
            return updateObject(state, updateStateAdd);
        case actionTypes.REMOVE_INGREDIENT:
            const updateIngredientRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updateIngredientsStateRemove = updateObject(state.ingredients, updateIngredientRemove);
            const updateStateRemove = {
                ingredients: updateIngredientsStateRemove,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true,
            }
            return updateObject(state, updateStateRemove);
        case actionTypes.SET_INGREDIENTS:
            return updateObject (state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false,
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default: 
            return state;
    }
}

export default reducer;