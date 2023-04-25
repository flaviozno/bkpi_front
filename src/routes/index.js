import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from '../pages/register/index'
import LoginPage from '../pages/login/LoginPage';
import Home from '../pages/home/Home.jsx'
import Menu from '../pages/Menu/Menu'
import ForgetPass from '../pages/forgetPass/ForgetPass';
import Profile from '../pages/Profile/Profile'
import { useSelector } from 'react-redux';
import { checkLoggedIn } from '../services/Auth'
import { useDispatch } from 'react-redux';
import PrivateRoute from '../PrivateRoute.js'
import ResetPass from '../pages/resetPass/ResetPass'
import history from './history'

export default function Routes() {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        dispatch(checkLoggedIn());
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login">
                    {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
                </Route>
                <Route exact path="/reset-password/:token" component={ResetPass} />
                <Route exact path="/forget-password" component={ForgetPass} />
                <Route exact path="/register" component={RegisterForm} />
                <PrivateRoute exact path="/" component={Home} isAuthenticated={isAuthenticated} />
                <PrivateRoute exact path="/menu" component={Menu} isAuthenticated={isAuthenticated} />
                <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
