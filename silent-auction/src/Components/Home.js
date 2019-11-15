import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAuctions } from '../Actions/auctionActions';
import Auctions from './Auctions';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const Home = (props) => {
    const classes= useStyles();
    useEffect(() => {
        props.fetchAuctions();
    }, [])

    return (
        <div className={classes.wrapper}>
            {/* testing spinner animation */}
            {props.loading && <div className="spinner" /> }

            {/* testing if we are getting our props */}
            {props.auctions && !props.loading && props.auctions.map ((cur, index) => (
                <Auctions key={index} id={cur.id} name={cur.name} seller={cur.seller} image={cur.image} description={cur.description} date_ending={cur.date_ending} current_price={cur.current_price} />
            ))}

            
        </div>
    )
}

// mapping our redux state to props
const mapStateToProps = (state) => {
    return {
        auctions: state.auction.auctions,
        loading: state.auction.loading,
    }
};

//map fetchAuctions function to props
const mapDispatchToProps = {
    fetchAuctions
} 

// connecting our Home props to our state and dispatch functions
export default connect(mapStateToProps, mapDispatchToProps)(Home);