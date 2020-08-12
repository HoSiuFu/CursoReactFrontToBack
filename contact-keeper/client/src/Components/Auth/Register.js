import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../Context/Auth/authContext';
import AlertContext from '../../Context/Alert/alertContext';

export const Register = (props) => {
    const authContext =  useContext(AuthContext);
    const alertContext =  useContext(AlertContext);

    const {setAlert} = alertContext;

    const {isAuthenticated, registerUser, error, clearErrors} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
            setAlert('You have been successfully registered', 'success');
        }

        if(error==='User already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }

        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {name, email, password, confirmPassword} = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' | password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== confirmPassword) {
            setAlert("Passwords don't match", 'danger');
        } else {
            registerUser({
                name,
                email,
                password
            })
        }
    }

    return(
        <div className='form-container bg-light'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required minLength="6"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} required/>
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register;