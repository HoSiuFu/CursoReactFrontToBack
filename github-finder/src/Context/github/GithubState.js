import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {GET_REPOS, GET_USER, SEARCH_USERS, SET_DEFAULT, SET_LOADING} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isDefault: true,
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const getDefaultUsers = async () => {
        setLoading();

        axios.get(defaultUrl)
            .then((res) => dispatch({
                    type: SEARCH_USERS,
                    payload: res.data
                })
            )
    }

    // Search Users
    const searchUsers = async text => {
        setLoading();

        let bool = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
            .then((res) => {
                if (res.data.items.length !== 0) {
                    dispatch({
                        type: SEARCH_USERS,
                        payload: res.data.items
                    });
                    setDefault(false);

                    return false;
                } else {
                    axios.get(defaultUrl)
                        .then((res) =>
                            (dispatch({
                                    type: SEARCH_USERS,
                                    payload: res.data
                                }),
                                    setDefault(true)
                            ));

                    return true;
                }
            });

        return bool
    };

    // Get User
    const getUser = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    };

    // Get Repos
    const getUserRepos = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    };

    // Clear Users
    const clearUsers = () => axios.get(defaultUrl)
        .then((res) => (dispatch({
                type: SEARCH_USERS,
                payload: res.data
            }), setDefault(true))
        );

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    const setDefault = (value) => dispatch({
        type: SET_DEFAULT,
        payload: value
    })

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                isDefault: state.isDefault,
                getDefaultUsers,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

const defaultUrl = `https://api.github.com/users`;


export default GithubState;
