import {GET_COUNTRIES, GET_DETAILS, FIND_COUNTRIES, ERROR_SEARCH, GET_ACTIVITIES} from '../actions'

const initialState = {
    countries: [],
    details: {},
    activities: [],
    error: {},
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_COUNTRIES: case FIND_COUNTRIES:
            return {countries: [...payload], details: {}, error: {}}

        case ERROR_SEARCH:
            return { ...state, error: {...payload}}

        case GET_DETAILS: 
            return { ...state, details: {...payload} }

        case GET_ACTIVITIES:
            return { ...state, activities: payload.map(activity => activity.name)}
        
        default: return {...state}
    }
}

export default rootReducer;