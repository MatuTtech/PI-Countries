import axios from 'axios';
export const GET_COUNTRIES = 'getCountries';
export const GET_DETAILS = 'getDetails';
export const FIND_COUNTRIES = 'createActivity';
export const ERROR_SEARCH = 'errorSearch'
export const GET_ACTIVITIES = 'getActivities'

const HOSTING = process.env.REACT_APP_HOSTING;

export const getCountries = () => async (dispatch) => {
    const countries = await axios(`http://${HOSTING}/countries`)
    dispatch({type: GET_COUNTRIES, payload: countries.data})
}
    
export const findCountries = (name, continent, activity) => async (dispatch) => {


    const search = activity 
    ? await axios(`http://${HOSTING}/countries?name=${name}&&continent=${continent}&&activity=${activity}`)
    : await axios(`http://${HOSTING}/countries?name=${name}&&continent=${continent}`)
    if(Array.isArray(search.data)) return dispatch({type: GET_COUNTRIES, payload: search.data})
    return dispatch({type: ERROR_SEARCH, payload: search.data})     
}

export const getDetails = (id) => async (dispatch) => {
    const details = await axios(`http://${HOSTING}/countries/${id}`)
    return dispatch({type: GET_DETAILS, payload: details.data}) 
}

export const getActivities = () => async (dispatch) => {
    const getActivities = await axios(`http://${HOSTING}/getActivities`)
    return dispatch({type: GET_ACTIVITIES, payload: getActivities.data})
}

export const createActivity = (dataForm) => async (dispatch) => {
    await axios.post(`http://${HOSTING}/activity`, {...dataForm})
}
