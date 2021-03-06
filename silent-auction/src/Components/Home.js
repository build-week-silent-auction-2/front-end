import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAuctions } from '../Actions/auctionActions';
import { fetchUser } from '../Actions/UserAction';
import Auctions from './Auctions';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
        borderRadius: '5px',
        border: '1px solid #101434',
        padding: '10px 20px',
        color: 'white',
        background: '#101434',
        '&:hover': {
            background: '#f2f2f2',
            color: '#101434',
        },
        '&:focus': {
            background: 'white',
            color: '#101434',
        },

    }
})

const Home = (props) => {
    const classes= useStyles();
    useEffect(() => {
        props.fetchAuctions();

        if(!props.user.role) {
            props.fetchUser();
        }
    }, [])
    
    return (
        <div className={classes.wrapper}>

            {/*grab user info, if user is seller then display button */}
            {props.user && props.user.role === "seller" && <Link className={classes.link} to="/addAuction"> Add New Auction</Link>}

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
        user: state.user.user,
        userError: state.user.error
    }
};

//map fetchAuctions function to props
const mapDispatchToProps = {
    fetchAuctions,
    fetchUser
} 

// connecting our Home props to our state and dispatch functions
export default connect(mapStateToProps, mapDispatchToProps)(Home);