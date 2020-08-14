import {
    ADD_LOG,
    CLEAR_CURRENT,
    DELETE_LOG,
    GET_LOGS,
    LOGS_ERROR, SEARCH_LOGS,
    SET_CURRENT,
    SET_LOADING,
    UPDATE_LOG
} from "../Actions/type";

const initialState = {
    logs: null,
    current: null,
    loading: false,
    error: null,
    filtered: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LOGS:
            return {
                ...state,
                logs: action.payload,
                loading: false
            }
        case UPDATE_LOG:
            return {
                ...state,
                logs: state.logs.map((log) =>
                log.id === action.payload.id ? action.payload:log),
                loading: false
            }
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter((log) =>
                action.payload !== log.id ),
                loading: false
            }
        case ADD_LOG:
            return {
                ...state,
                logs: [...state.logs,action.payload],
                loading: false
            }
        case GET_LOGS:
            return {
                ...state,
                logs: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                loading: false
            }
        case LOGS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}