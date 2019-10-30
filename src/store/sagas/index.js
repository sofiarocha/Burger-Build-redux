import { takeEvery, all } from 'redux-saga/effects';

import { authLogoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga),
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.SET_INITIATE_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INITIAL_STATE, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}