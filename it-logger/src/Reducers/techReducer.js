import {ADD_TECH, DELETE_TECH, GET_TECHS, SET_LOADING, TECHS_ERROR} from "../Actions/type";
import {whenMapStateToPropsIsMissing} from "react-redux/lib/connect/mapStateToProps";


const initialState = {
    techs: null,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TECHS:
            return {
                ...state,
                techs: action.payload,
                loading: false
            };
        case ADD_TECH:
            return {
                ...state,
                techs: [...state.techs, action.payload],
                loading: false
            }
        case DELETE_TECH:
            return {
                ...state,
                techs: state.techs.filter((tech) => (tech.id !== action.payload))
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case TECHS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}