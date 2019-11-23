import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchAuctionById, editAuction, } from '../Actions/auctionActions';
import { fetchUser } from '../Actions/UserAction';
import { addBid, deleteBid, editBid } from '../Actions/bidActions'
import api from '../Utils/api';
import useDate from '../Utils/useDate';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    imgTag: {
        width: '70%',
    },
    wrapper: {
        display:'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        fontSize: '1.3rem'
    },
    auctionWrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
    },
    img: {
        width: '50%',
    },
    editButton: {
        background: '#1D4062',
        border: '1px solid #1D4062',
        fontSize: '1.2rem',
        padding: '10px 15px',
        margin: '20px 20px',
        color: 'white',
        '&:hover': {
            background: 'white',
            color: 'black',
            cursor: 'pointer'
        }
    },
    deleteButton: {
        background: 'red',
        border: '1px solid red',
        color: 'white',
        fontSize: '1.2rem',
        padding: '10px 15px',
        margin: '20px 20px',
        '&:hover': {
            background: 'white',
            color: 'red',
            cursor: 'pointer'
        }
    },
    formInput: {
        padding: '10px 0',
        fontSize: '1rem',
        margin: '10px',
    },
    bidsButton: {
        background: '#101434',
        color: 'white',
        border: '1px solid black',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '6px',
        '&:hover': {
            background: 'white',
            color: 'black',
            
        }
    },
    texts: {
        width: '50%',
    },
    link: {
        alignSelf: 'flex-start',
        textDecoration: 'none',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '3px 7px',
        color: 'white',
        background: 'rgb(13,42,70)',
        margin: '20px',
        '&:hover': {
            background: 'lightgray',
            color: 'rgb(13,42,70)'
        }

    }
})

const Auction = (props) => {
    const classes = useStyles();
    const [ bid,setBid ] = useState({
        price: ''
    }); 
    const [editOpen, setEditOpen] = useState(false);
    const [auction, setAuction] = useState({
        name: '',
        starting_price: '',
        date_starting: '',
        date_ending: '',
        description: '',
        image: ''
    });
    const [showBids, setShowBids] = useState(false);
    
    const date = useDate(props.auction.date_ending);
    const [error, setError] = useState();

    const handleBid = (e) => {
        setBid({
            price: e.target.value
        })
    }
    const handleDelete = () => {
        props.deleteBid(props.bid_id);
    }
    const handleEdit = () => {
        props.editBid(props.bid_id, bid);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBid(props.match.params.id, bid);   
    }

    const handleEditAuction = (e) => {
        setEditOpen(!editOpen);
    }

    const handleDeleteAuction = () => {
        api().delete(`/auctions/${props.match.params.id}`)
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                setError('Could not delete auction')
            })
    }

    const handleSubmitAuction = (e) => {
        e.preventDefault();
        props.editAuction(props.match.params.id, auction);
        setAuction({
            name: '',
            starting_price: '',
            date_starting: '',
            date_ending: '',
            description: '',
            image: ''
        })
    }

    const handleChange = (e) => {
        setAuction({
            ...auction,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        props.fetchAuctionById(props.match.params.id);
        if (!props.user.role) {
            props.fetchUser();
        }
    }, [props.bid_id])

    return (
        <div className={classes.wrapper}>
            <Link to="/" className={classes.link}>Back</Link>
            {props.loading ? <div className="spinner" /> : (
                <div className={classes.auction}>
                    <h2 className={classes.header}>{props.auction.name}</h2>
                    <div className="auctionWrapper">
                        <div className={classes.img}>
                            <img className={classes.imgTag} src={props.auction.image} alt={props.auction.name} />
                        </div>
                        <div className={classes.texts}>
                            <p>{props.auction.description}</p>
                            <span>Ending On: {date}</span>
                            <p>Starting Price: {props.auction.starting_price} </p>

                            {/* if props.auction.bids, props.auction.bids[props.auction.bids.length -1]  should get last bid */}
                            <p>Current Price: {props.auction.bids && props.auction.bids[props.auction.bids.length -1].price}</p>

                            {props.user && props.user.role === "buyer" && (
                                <div>
                                    <form onSubmit = { handleSubmit } >
                                        <input className={classes.formInput}type = "number" placeholder = "Add Bid" value = {bid.price} onChange = { handleBid } />
                                        <button className={classes.editButton}  type = "submit">New Bid</button>
                                    </form>
                                    <button className={classes.editButton} onClick = { handleEdit }>Edit Bid</button>
                                    <button className={classes.deleteButton} onClick = { handleDelete }>Delete Bid</button>
                                </div>
                            )}
                            <button onClick={() => setShowBids(!showBids)} className={classes.bidsButton}>{showBids ? "Hide Bids" : "Show All Bids"}</button>
                            {showBids && <p>Bids: </p>}
                            {showBids && props.auction.bids && props.auction.bids.map((cur, index) => {
                                return <p key={index}>User: {cur.username} Bid: {cur.price}</p>
                            })}
                            <p>Sold By: {props.auction.seller} </p>
                        </div>
                    </div>
                </div>
            )}
            {props.user && props.user.role === "seller" && (
                <div className={classes.buttonDiv}>
                    <button className={classes.editButton} onClick={handleEditAuction}>Edit </button>
                    <button className={classes.deleteButton} onClick={handleDeleteAuction}> Delete</button>
                </div>
            )}

            {editOpen && (
                <form className={classes.form} onSubmit={handleSubmitAuction}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" placeholder="Name" value={auction.name} onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="starting_price">Starting Price: </label>
                        <input type="number" name="starting_price" placeholder="Starting Price" value={auction.starting_price} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="date_starting">Start Date: </label>
                        <input type="date" name="date_starting" placeholder="Start Date" value={auction.date_starting} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="date_ending">End Date: </label>
                        <input type="date" name="date_ending" placeholder="End Date" value={auction.date_ending} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" placeholder="Description" value={auction.description} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="image">Image URL</label>
                        <input type="text" name="image" placeholder="Image URL" value={auction.image} onChange={handleChange} />
                    </div>

                    <button type="submit">Edit Auction</button>
                </form>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auction: state.auction.auction,
        loading: state.auction.loading,
        bid_id: state.bid.bid_id,
        user: state.user.user
    }
}

const mapDispatchToProps = {
    fetchAuctionById, 
    addBid, 
    deleteBid, 
    editBid,
    fetchUser,
    editAuction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);