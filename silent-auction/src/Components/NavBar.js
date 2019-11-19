import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'none',
    }

})

const NavBar = (props) => {
    const classes=useStyles();
    return (
        <nav className={classes.wrapper}>

        </nav>
    )
}

export default NavBar;