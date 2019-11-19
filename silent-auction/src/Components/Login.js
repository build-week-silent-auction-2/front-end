import React, { useState } from 'react';
import api from '../Utils/api';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    wrapper: {

    },
    error: {
        color: 'red',
    },
    formWrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        borderRight: '2px solid gray',
        borderLeft: '2px solid gray',
        borderBottom: '2px solid gray',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '350px',
        minHeight: '300px',
        // width: '30%',
        background: 'white',
        maxWidth: '600px',
    },
    form: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    header: {
        width: '100%',
    },
    formInputs: {
        margin: '20px 0',
        padding: '15px 40px',
        textAlign: 'center',
        borderRadius: '25px',
        fontSize: '1.5rem',
        border: '1px solid lightgray',
        background: '#F2F2F2'
    },
    button: {
        borderRadius: '25px',
        background: 'rgb(13,42,70)',
        color: 'white',
        padding: '15px 40px',
        border: 'none',
        fontSize: '1.2rem',
        '&:hover': {
            background: '#D5DFE5',
            color: '#253A4B',
        }
    },
    img: {
        width: '100%',
    },
    link: {
        textDecoration: 'none',
        color: '#89566A',
        '&:hover': {
            color: 'rgb(13, 42, 70)',
        }
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
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                setSpinner(false)
                setError("Invalid Username or Password")
            })
    }

    return (
        <div className='wrapper'>

            <div className={classes.formWrapper}>
                {/* <div className={classes.header}> */}
                    <img className={classes.img} src={require('../Assets/SIlent-auction.png')} />
                {/* </div> */}
                {spinner ? <div className="spinner" /> : (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        {error && <span className={classes.error}>{error}</span>}
                        
                        <input className={classes.formInputs} type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                        <input className={classes.formInputs} type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />

                        <button className={classes.button} type="submit">Login</button>
                    </form>
                )}
                <p>Don't have an account? <Link className={classes.link} to="/Signup">Sign up!</Link></p>
            </div>
        
        </div>
    )
}

export default Login;