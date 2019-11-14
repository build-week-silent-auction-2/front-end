import React, { useState } from 'react';
import api from '../Utils/api';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',

    },
    error: {
        color: 'red',
    }
})

const Login = (props) => {
    const classes= useStyles();
    const [spinner, setSpinner] = useState(false)

    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(!spinner)
        api().post('/auth/login', user)
            .then(res => {
                setSpinner(!spinner)
                localStorage.setItem('token', res.data.token)
                props.history.push('/Home')
            })
            .catch(err => {
                console.log(err)
                setSpinner(false)
                setError("Invalid Username or Password")
            })
    }

    return (
        <div className={classes.wrapper}>
            {spinner ? <div className="spinner" /> : (
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                    {error && <span className={classes.error}>{error}</span>}
                    
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />

                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/Signup">Sign up!</Link></p>
            </div>
            )}
        </div>
    )
}

export default Login;