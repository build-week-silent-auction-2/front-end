import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchAuctionById, editAuction, deleteAuction } from '../Actions/auctionActions';
import { fetchUser } from '../Actions/UserAction';
import { addBid, deleteBid, editBid } from '../Actions/bidActions'
import api from '../Utils/api';


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
        background: 'white',
        border: '1px solid black',
        fontSize: '1.2rem',
        padding: '10px 15px',
        margin: '0px 20px',
        '&:hover': {
            background: '#1D4062',
            color: 'white',
        }
    },
    deleteButton: {
        background: 'white',
        border: '1px solid red',
        color: 'red',
        fontSize: '1.2rem',
        padding: '10px 15px',
        margin: '0px 20px',
        '&:hover': {
            background: 'red',
            color: 'white',
        }
    }
})

const Auction = (props) => {
    const classes = useStyles();
    const [ bid,setBid ] = useState(); 
    const [editOpen, setEditOpen] = useState(false);
    const [auction, setAuction] = useState({
        name: '',
        starting_price: '',
        date_starting: '',
        date_ending: '',
        description: '',
        image: ''
    });
    const [error, setError] = useState();

    const handleBid = (e) => {
        setBid (e.target.value);
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
                        {props.user && props.user.role === "buyer" && (
                            <div>
                                <form onSubmit = { handleSubmit } >
                                    <input type = "number" placeholder = "Add Bid" value = {bid} onChange = { handleBid } />
                                    <button type = "submit">New Bid</button>
                                </form>
                                <button onClick = { handleEdit }>Edit Bid</button><button onClick = { handleDelete }>Delete Bid</button>
                            </div>
                        )}
                        <p>Bids: </p>{props.auction.bids && props.auction.bids.map((cur, index) => {
                            return <p key={index}>User: {cur.username} Bid: {cur.price}</p>
                        })}
                        <p>Sold By: {props.auction.seller} </p>
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