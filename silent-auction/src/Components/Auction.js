import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchAuctionById } from '../Actions/auctionActions';
import { addBid, deleteBid, editBid } from '../Actions/bidActions'


const useStyles = makeStyles({
    imgTag: {
        width: '25%',
    },
    wrapper: {
        display:'flex',
        flexFlow: 'column wrap',
    },
    auctionWrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
    }
})

const Auction = (props) => {
    const classes = useStyles();
    const [ bid,setBid ] = useState(); 
    const handleChange = (e) => {
        setBid (e.target.value) 
    }
    const handleDelete = () => {
        props.deleteBid(props.bid_id)
    }
    const handleEdit = () => {
        props.editBid(props.bid_id, bid)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBid(props.match.params.id, bid);   
    }
    console.log(bid);
    useEffect(() => {
        props.fetchAuctionById(props.match.params.id);
    }, [])
    return (
        <div className={classes.wrapper}>
            {props.loading ? <div className="spinner" /> : (
                <div className={classes.auctionWrapper}>
                    <div className={classes.img}>
                        <img className={classes.imgTag} src={props.auction.image} alt={props.auction.name} />
                    </div>
                    <div className={classes.texts}>
                        <h2>{props.auction.name}</h2>
                        <p>{props.auction.description}</p>
                        <span>Ending On: {props.auction.date_ending}</span>
                        <p>Starting Price: {props.auction.starting_price} </p>
                        <form onSubmit = { handleSubmit } > <input type = "number" placeholder = "Add Bid" value = {bid} onChange = { handleChange } /><button type = "submit">New Bid</button></form>
                    <button onClick = { handleEdit }>Edit Bid</button><button onClick = { handleDelete }>Delete Bid</button>
                        <p>Bids: </p>{props.auction.bids && props.auction.bids.map((cur, index) => {
                            return <p key={index}>User: {cur.username} Bid: {cur.price}</p>
                        })}
                        <p>Sold By: {props.auction.seller} </p>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auction: state.auction.auction,
        loading: state.auction.loading,
        bid_id: state.bid.bid_id
    }
}

const mapDispatchToProps = {
    fetchAuctionById, addBid, deleteBid, editBid
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);