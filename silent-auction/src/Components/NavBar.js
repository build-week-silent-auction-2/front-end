import React, {useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    wrapper: {
        background: '#1D4062',
        minHeight: '50px',
        maxHeight: '100px',
        color: 'white',
        position: 'relative',
        marginBottom: '5%',
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: '3',
    },
    nav: {
        paddingRight: '20px',
    },
    menuToggle: {
        cursor: 'pointer',
        background: '#1D4062',
        border: 'none',
        color: 'white',
        transition: 'all .5 ease',
        zIndex: '1',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.2)'
        },
        '&:focus': {
            outline: 'none',
            cursor: 'pointer'
        }
    },
    menuWrapper: {
        position: 'absolute',
        top: '50px',
        zIndex: '2',
        width: '30vw',
        height: '30vh',
        background: '#F2F2F2',
        borderLeft: '1px solid rgba(0,0,0,.2)',
        borderBottom: '1px solid rgba(0,0,0,.2)',
        color: 'white',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: '1',
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.4rem',
        color: 'black',
        '&:hover': {
            color: '#101434'
        }
    },


})

const NavBar = (props) => {
    const classes=useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
    }
    return (
        <nav className={classes.wrapper}>
            <div className={classes.nav}>
                <button onClick={handleOpen} className={open ? `${classes.menuToggle} ${classes.closeButton}` : classes.menuToggle}> {open ? <ClearIcon fontSize="large" /> : <MenuIcon fontSize="large" />}</button>
            </div>
            {open && <div className={classes.menuWrapper}>
                    <Link className={classes.link} onClick={handleLogout} to="/login">Logout</Link>
                </div>}
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, null)(NavBar);