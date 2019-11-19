import React, { useState } from 'react';
import api from '../Utils/api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Signup = (props) => {
    const classes = useStyles();

    const [user, setUser] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        is_seller: false
    });

    const [error, setError] = useState();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckbox = (e) => {
        setUser({
            ...user,
            is_seller: !user.is_seller
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        api().post('/auth/register', user)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                props.history.push('/')

            })
            .catch(err => {
                setError('Could not create user')
            })
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                    <input type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
                    <input type="text" placeholder="Last name" name="last_name" value={user.last_name} onChange={handleChange} />
                    <label htmlFor="seller">Seller? </label>
                    <input type="checkbox" checked={user.is_seller} name="seller" value={user.is_seller} onChange={handleCheckbox} />

                    <button type="submit">Register</button>
                </form>
                {error && <span className={classes.error}>{error} </span>}
            </div>
        </div>
    )
}

export default Signup;
