export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_FAILURE = 'LOAD_FAILURE'

export const loadFoods = (foods) => ({
    type: LOAD_SUCCESS,
    payload: foods
})