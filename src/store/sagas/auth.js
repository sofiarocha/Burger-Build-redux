import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import { logoutSucceed, authLogout, authStart, authSuccess, checkAuthTimeout, authFail } from '../actions/actions';
import { API_KEY } from '../../keys';

export function* authLogoutSaga(action) {
    //use call method is better to test
    // yield localStorage.removeItem("token");
    // yield localStorage.removeItem("expirationDate");
    // yield localStorage.removeItem("userId");
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(authLogout());
}

export function* authSaga(action) {
    yield put(authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!action.isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    try {
        const response = yield axios.post(url, authData);
        // is not necessary to use the promise no more, because it just gonna execute the rest of the code after the fecth is complete
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem("token", response.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    const userId = yield localStorage.getItem("userId");
    if (!token) {
        yield put(authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if (expirationDate > new Date()) {
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(authLogout());
        }
    }
}