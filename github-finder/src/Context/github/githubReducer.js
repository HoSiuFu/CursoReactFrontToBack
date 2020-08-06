import {GET_REPOS, GET_USER, SEARCH_USERS, SET_DEFAULT, SET_LOADING} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case GET_REPOS: {
            return {
                ...state,
                repos: action.payload,
                loading: false
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_DEFAULT:
            return {
                ...state,
                isDefault: action.payload
            }
        default:
            return state;
    }
};
