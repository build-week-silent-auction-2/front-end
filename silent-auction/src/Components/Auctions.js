import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import useDate from '../Utils/useDate';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '50%',
    },
    texts: {
        width: '50%',
    },
    imgTag: {
        width: '35%',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    auctionWrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        // borderBottom: '1px solid gray',
        padding: '20px',
        margin: '20px 0',
        width: '70%',
        '&:hover': {
            background: '#f2f2f2',
        }
    },
    borderDiv: {
        background: 'lightgray',
        height: '2px',
        width: '50vw'
    }
})

const Auctions = (props) => {
    const classes = useStyles();
    const date = useDate(props.date_ending)
    return (
        <div className={classes.wrapper}>
            <div className={classes.auctionWrapper}>
                <Link to={`/auctions/${props.id}`} className={classes.link}>
                    <div className={classes.img}>
                        <img className={classes.imgTag} src={props.image} alt={props.name} />
                    </div>
                    <div className={classes.texts}>
                        <h2>{props.name}</h2>
                        {/* <p>{props.description}</p> */}
                        <span>Ending On: {date}</span>
                        <p>Current Bid: {props.current_price} </p>
                        <p>Sold By: {props.seller} </p>
                    </div>
                </Link>
            </div>
            <div className={classes.borderDiv} />
        </div>
    )
}

export default Auctions;