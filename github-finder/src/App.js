import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import User from './Components/users/User';
import Alert from './Components/layout/Alert';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import NotFound from './Components/pages/NotFound';


import GithubState from './Context/github/GithubState';
import AlertState from './Context/alert/AlertState';

import './App.css';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App background'>
                        <Navbar/>
                        <div className='container'>
                            <Alert/>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/user/:login' component={User}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
