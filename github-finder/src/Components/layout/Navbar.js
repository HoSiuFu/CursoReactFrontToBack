import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Logo from '../../Assets/github-logo.png';

const Navbar = ({icon, title}) => {
    return (
        <nav className='navbar bg-light'>
            <h1>
                <img src={icon} alt='' style={{width: '20px'}}/> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/' style={{color: 'black'}}>Home</Link>
                </li>
                <li>
                    <Link to='/about' style={{color: 'black'}}>About</Link>
                </li>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: Logo
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar;
