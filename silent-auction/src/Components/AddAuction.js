import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAuction } from '../Actions/auctionActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        
    },
    form: {

    }
})

// Labels needed for form
    // 1. name
    // 2. starting_price
    // 3. date_starting
    // 4. date_ending
    // 5. description
    // 6. image

const AddAuction = (props) => {
    const classes = useStyles();

    const [auction, setAuction] = useState({
        name: '',
        starting_price: '',
        date_starting: '',
        date_ending: '',
        description: '',
        image: ''
    });

    const handleChange = e => {
        setAuction({ ...auction, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        //makes a post request to the api and gives it our item object
        props.addAuction(auction)

        setAuction({
            name: '',
            starting_price: '',
            date_starting: '',
            date_ending: '',
            description: '',
            image: ''
        });
    };
    
    
    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={handleSubmit}>
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

                <button type="submit">Add Auction</button>
            </form>
        </div>

    )
}

const mapDispatchToProps = {
    addAuction
}

export default connect(null, mapDispatchToProps)(AddAuction);