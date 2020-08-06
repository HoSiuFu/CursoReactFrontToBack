import React, {Fragment, useContext, useEffect} from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

import GithubContext from "../../Context/github/githubContext";

const Home = () => {
    const githubContext = useContext(GithubContext);

    useEffect(() => {
        if (githubContext.users.length === 0)
            githubContext.getDefaultUsers();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Search/>
            <Users/>
        </Fragment>
    );
}

export default Home;
