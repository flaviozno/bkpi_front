import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';
import foodsReducer from './reducer/foods';

const store = configureStore({
    reducer: {
        auth: userReducer,
        foods: foodsReducer
    }
});

export default store;