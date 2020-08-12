import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import ContactState from './Context/Contact/ContactState';
import './App.css';
import AuthState from "./Context/Auth/AuthState";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import setAuthToken from "./Utils/setAuthToken";
import AlertState from "./Context/Alert/AlertState";
import Alerts from "./Components/Layout/Alerts";
import PrivateRoute from "./Components/Route/Route";
import NotFound from "./Components/Pages/NotFound";

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar/>
                            <div className='background-hk'>
                                <div className='container'>
                                    <Alerts/>
                                    <Switch>
                                        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                                        <Route exact path='/about' component={About}></Route>
                                        <Route exact path='/register' component={Register}></Route>
                                        <Route exact path='/login' component={Login}></Route>
                                        <Route component={NotFound}></Route>
                                    </Switch>
                                </div>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
}

export default App;
