import {ADD_TECH, DELETE_TECH, GET_TECHS, SET_LOADING, TECHS_ERROR} from "./type";

//Get Techs
export const getTechs = () => async (dispatch) => {
    try {
        setLoading();

        const res = await fetch('/techs');
        const data = await res.json();

        dispatch({
            type: GET_TECHS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.data
        })
    }
}

//Add Tech
export const addTech = (tech) => async (dispatch) => {
    try {
        setLoading();

        const request = {
            method: 'POST',
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch('/techs', request);
        const data = await res.json();

        dispatch({
            type: ADD_TECH,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.data
        })
    }
}


//Delete tech
export const deleteTech = (id) => async (dispatch) => {
    try {
        setLoading();

        const request ={
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await fetch(`/techs/${id}`, request);

        dispatch({
            type: DELETE_TECH,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.data
        })
    }
}

//Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}