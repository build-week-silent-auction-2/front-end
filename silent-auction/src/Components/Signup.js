import React, { useState,  } from 'react';
import api from '../Utils/api';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    formWrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        borderRight: '2px solid gray',
        borderLeft: '2px solid gray',
        borderBottom: '2px solid gray',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '250px',
        minHeight: '250px',
        background: 'white',
        maxWidth: '600px',

    },
    form: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        textAlign: 'center',
    },
    img: {
        width: '100%',
    },
    formInputs: {
        margin: '2% 0',
        width: '70%',
        padding: '15px 40px',
        // textAlign: 'center',
        borderRadius: '25px',
        fontSize: '1.5rem',
        border: '1px solid lightgray',
        background: '#F2F2F2',
        '&:focus': {
            border: '1px solid blue'
        }
    },
    button: {
        marginTop: '10px',
        borderRadius: '25px',
        background: 'rgb(13,42,70)',
        color: 'white',
        padding: '15px 40px',
        border: 'none',
        fontSize: '1.2rem',
        '&:hover': {
            background: '#D5DFE5',
            color: '#253A4B',
        },
        '&:focus': {
            background: '#D5DFE5',
            color: '#253A4B',
        }
    },
    radio: {
        fontSize: '1.5rem',
        marginRight: '10px',
    },
    link: {
        textDecoration: 'none',
        color: '#89566A',
        '&:hover': {
            color: 'rgb(13, 42, 70)',
        },
        '&:focus': {
            color: 'rgb(13, 42, 70)',
        }
    },
    header: {
        position: 'relative',
        marginTop: '-40px'
    },
    error: {
        color: 'red',
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

    const [spinner, setSpinner] = useState(false);

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
        setSpinner(!spinner)
        api().post('/auth/register', user)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setSpinner(!spinner)
                props.history.push('/')
            })
            .catch(err => {
                setSpinner(false)
                setError('Could not create account, please try again')
            })
    }

    return (
        <div className="wrapper">
            <div className={classes.formWrapper}>
                <img src={require('../Assets/SIlent-auction.png')} alt="Silent auction" className={classes.img} />
                <h2 className={classes.header}>Create an Account</h2>
                {error && <span className={classes.error}>{error} </span>}
                {spinner ? <div className="spinner" /> : (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input className={classes.formInputs} type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
                        <input className={classes.formInputs} type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                        <input className={classes.formInputs} type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} />
                        <input className={classes.formInputs} type="text" placeholder="Last name" name="last_name" value={user.last_name} onChange={handleChange} />
                        <div>
                            <label className={classes.radio} htmlFor="is_seller">
                            <input type="radio" checked={user.is_seller ? true : false } name="is_seller" value="Seller" onChange={handleCheckbox} />
                                Seller
                            </label>
                            <label className={classes.radio}  htmlFor="is_seller">
                            <input type="radio" checked={!user.is_seller ? true : false} name="is_seller" value="Buyer" onChange={handleCheckbox} />
                                Buyer
                            </label>
                        </div>

                        <button className={classes.button} type="submit">Register</button>
                    </form>
                )}
                <p>Already have an account? <Link className={classes.link} to="/Login">Login!</Link></p>
            </div>
        </div>
    )
}

export default Signup;
