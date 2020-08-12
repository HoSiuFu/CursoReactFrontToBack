import React, { useReducer } from  'react';
import AuthContext from './authContext';
import axios from 'axios';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';
import setAuthToken from "../../Utils/setAuthToken";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    const loadUser = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        if(localStorage.token)
            setAuthToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth', config);

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    };

    //Register User
    const registerUser = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const res = await axios.post('/api/users', user, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            await loadUser();
        } catch (err) {
            console.error(err.message);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Login User
    const loginUser = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.post('/api/auth', user, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            await loadUser();
        } catch (err) {
            console.error(err.message);
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    //Logout
    const logout = () => {
        dispatch({type: LOGOUT})
    }

    //Clear Errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS});
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            registerUser,
            clearErrors,
            loadUser,
            loginUser,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;