import { LOAD_SUCCESS, LOAD_FAILURE } from '../actions/foods';

const initialState = {
    hasFoods: false,
    food: null
};

const foodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            return {
                ...state,
                hasFoods: true,
                food: action.payload
            }
        case LOAD_FAILURE:
            return{
                ...state,
                hasFoods: false,
                food: null
            }
        default:
            return state
    }
}

export default foodsReducer;