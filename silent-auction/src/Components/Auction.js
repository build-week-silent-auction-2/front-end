import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchAuctionById } from '../Actions/auctionActions';

const useStyles = makeStyles({

})

const Auction = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.fetchAuctionById(props.match.params.id);
    }, [props])
    return (
        <div className={classes.wrapper}>
            <div className={classes.img}>
                <img className={classes.imgTag} src={props.auction.image} alt={props.auction.name} />
            </div>
            <div className={classes.texts}>
                <h2>{props.auction.name}</h2>
                <p>{props.auction.description}</p>
                <span>Ending On: {props.auction.date_ending}</span>
                <p>Current Bid: {props.auction.current_price} </p>
                
                <p>Sold By: {props.auction.seller} </p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auction: state.auction.auction
    }
}

const mapDispatchToProps = {
    fetchAuctionById
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);