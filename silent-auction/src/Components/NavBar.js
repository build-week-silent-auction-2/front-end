import React, {useState, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '../Utils/navHook';

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
        zIndex: '2',
    },
    link: {
        textDecoration: 'none',
        fontSize: '1.4rem',
        color: 'black',
        '&:hover': {
            color: 'white'
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

    //closes nav if you click outside of it
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <div className={classes.wrapper} ref={node}>
                {/* hamburger menu */}
            <button onClick={handleOpen}className="styledButton">
                <div className={open ? "openFirstDiv" : "firstDiv"} />
                <div className={open ? "openSecondDiv" : "secondDiv"} />
                <div className={open ? "openThirdDiv" : "thirdDiv" }/>
            </button>
            {/* menu open */}
            <nav className={open ? "navMenu" : "navMenuClosed"}>
                <Link className={classes.link} onClick={handleLogout} to="/login">Logout</Link>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, null)(NavBar);