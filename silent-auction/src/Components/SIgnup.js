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
        seller: false
    });

    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        api().post('/auth/register', user)
            .then(res => {
                console.log(res);
                setSuccess('User successfully created');
                setTimeout(() => {
                    props.history.push('/')
                }, 500)
            })
            .catch(err => {
                setError('Could not create user')
            })
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.form-wrapper}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                    <input type="text" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                    <input type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
                    <input type="text" placeholder="Last name" name="username" value={user.last_name} onChange={handleChange} />
                    <input type="checkbox" placeholder="Seller" name="seller" value={user.seller} onChange={handleChange} />

                    <button type="submit">Register</button>
                </form>
                {success && <span className={classes.success}>{success} </span>}
                {error && <span className={classes.error}>{error} </span>}
            </div>
        </div>
    )
}

export default Signup;