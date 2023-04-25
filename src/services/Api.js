import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
      }
});

export default {
    getFoods: async function () {
       return await api.get('/foods')
    },
    checkFood: async function (data, email){
        return await api.post('/checkFood', {
            food_data: data,
            user_email: email
        })
    }
}