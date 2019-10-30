import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: "",
            userId: "",
            error: "",
            loading: false,
            authRedirectPath: "/",
        });
    });

    it('should store token upon login', () => {
        expect(reducer({
            token: "",
            userId: "",
            error: "",
            loading: false,
            authRedirectPath: "/",
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: "something",
            userId: "some-user"
        })).toEqual({
            token: "something",
            userId: "some-user",
            error: "",
            loading: false,
            authRedirectPath: "/",
        })
    });
})