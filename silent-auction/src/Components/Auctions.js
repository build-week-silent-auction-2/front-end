import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        textAlign: 'left',
        marginBottom: '20px',
    },
    img: {
        width: '50%',
    },
    texts: {
        width: '50%',
    },
    imgTag: {
        width: '35%',
    }
})

const Auctions = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.img}>
                <img className={classes.imgTag} src={props.image} alt={props.name} />
            </div>
            <div className={classes.texts}>
                <h2>{props.name}</h2>
                {/* <p>{props.description}</p> */}
                <span>Ending On: {props.date_ending}</span>
                <p>Current Bid: {props.current_price} </p>
                <p>Sold By: {props.seller} </p>
            </div>
        </div>
    )
}

export default Auctions;