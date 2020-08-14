import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOG,
    DELETE_LOG,
    UPDATE_LOG,
    SET_CURRENT,
    CLEAR_CURRENT, SEARCH_LOGS,
} from './type';

//Get Logs
export const getLogs = () => async (dispatch) => {
    try {
        setLoading();

        const res = await fetch('/logs');
        const data = await res.json();

        dispatch({
            type: GET_LOGS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        })
    }
}

//Add Logs
export const addLog = (log) => async (dispatch) => {
    try {
        setLoading();

        const request ={
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch('/logs', request);
        const data = await res.json();

        dispatch({
            type: ADD_LOG,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        })
    }
}

//Delete log
export const deleteLog = (id) => async (dispatch) => {
    try {
        setLoading();

        const request ={
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await fetch(`/logs/${id}`, request);

        dispatch({
            type: DELETE_LOG,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        })
    }
}

//Update Log
export const updateLog = (log) => async (dispatch) => {
    try {
        setLoading();

        const request ={
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        };

        const res = await fetch(`/logs/${log.id}`, request);
        const data = await res.json();

        dispatch({
            type: UPDATE_LOG,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        });
    }
}

//Set current
export const setCurrent = (log) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT,
        payload: log
    });
}

//Clear current
export const clearCurrent = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT
    })
}

export const searchLogs = (text) => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch(`/logs?q=${text}`);
        const data = await res.json();

        dispatch({
            type: SEARCH_LOGS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        });
    }
}

//Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}