import React, {useContext} from 'react';
import AuthContext from "../../Context/Auth/authContext";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, loading } = authContext;

    return (
        <Route {...rest} render={(props) =>
            !isAuthenticated && !loading ?
            (<Redirect to='/login'/>) :
            (<Component {...props}/>)
        }/>
    )
}

export default PrivateRoute;