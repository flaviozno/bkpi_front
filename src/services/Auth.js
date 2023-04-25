import axios from 'axios'
import { login, logout } from '../pages/redux/actions/user'
import { toast, ToastContainer } from 'react-toastify'

export const TOKEN_KEY = '@bkpi-token'
export const TOKEN_KEY_USER = '@bkpi-user'
export const isAlreadyAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const saveTokenInStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const saveUserInStorage = (user) => {
    localStorage.setItem(TOKEN_KEY_USER, JSON.stringify(user))
}

export const removeStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY_USER)
}

export const checkLoggedIn = () => async (dispatch) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(TOKEN_KEY_USER));
    if (token) {
        const data = {
            access_token: token
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/validate-token', data);
            if (response.data) {
                const userData = {
                    user: {
                        email: user.email,
                        password: user.password,
                        name: user.name,
                        photo: user.photo,
                        foods: user.foods
                    },
                    access_token: token
                }
                dispatch(login(userData));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            toast.error(error.response.data.detail, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return (
                < ToastContainer />
            )
        }
    }
};