import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../Context/Auth/authContext';
import ContactContext from "../../Context/Contact/contactContext";

export const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const {isAuthenticated, logout, user} = authContext;
    const {clearContacts} = contactContext;

    const onClick = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <a href='#!' onClick={onClick}>
                    <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const normalLinks = (
        <Fragment>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks: normalLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;