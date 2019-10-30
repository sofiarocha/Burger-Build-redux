import { put } from "redux-saga/effects";

import axios from '../../axios-orders';
import {
    purchaseBurgerStart,
    purchaseBurgerSucess,
    purchaseBurgerFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFail 
 } from '../actions/actions';


export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(purchaseBurgerSucess(response.data.name, action.orderData));
    } catch (error) {
        yield put(purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    try {
        const response = yield axios.get(`/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(fetchOrdersSuccess(fetchedOrders));
    } catch(error) {
        yield put(fetchOrdersFail(error));
    }
}
