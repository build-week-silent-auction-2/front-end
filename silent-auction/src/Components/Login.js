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
        width: '100%',
        height: '100vh'
    },
    error: {
        color: 'red',
    },
    formWrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        borderRight: '2px solid gray',
        borderLeft: '2px solid gray',
        borderBottom: '3px solid black',
        justifyContent: 'space-between',
        minWidth: '500px',
        minHeight: '300px',
    },
    form: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    header: {
        background: 'rgb(13, 42, 70)',
        color: 'white',
        top: '0',
        width: '100%',
    },
    formInputs: {
        margin: '20px 0',
        padding: '7px 10px',
        textAlign: 'center'
    },
    button: {
        
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

            <div className={classes.formWrapper}>
                <div className={classes.header}>
                    <h2>Silent Auction</h2>
                </div>
                {spinner ? <div className="spinner" /> : (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        {error && <span className={classes.error}>{error}</span>}
                        
                        <input className={classes.formInputs} type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                        <input className={classes.formInputs} type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />

                        <button className={classes.button} type="submit">Login</button>
                    </form>
                )}
                <p>Don't have an account? <Link to="/Signup">Sign up!</Link></p>
            </div>
        
        </div>
    )
}

export default Login;