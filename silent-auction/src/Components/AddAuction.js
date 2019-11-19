import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addAuction } from '../Actions/auctionActions';

// Lables needed for form
    // 1. name
    // 2. starting_price
    // 3. date_starting
    // 4. date_ending
    // 5. description
    // 6. image

const AddAuction = (props) => {
        const [item, setItem] = useState({
        name: '',
        starting_price: '',
        date_starting: '',
        date_ending: '',
        description: '',
        image: '',
    })

    const handleChanges = e => {
        console.log(note);
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const submitForm = e => {
        e.preventDefault();
        props.addAuction(item);
        setItem({
            name: '',
            starting_price: '',
            date_starting: '',
            date_ending: '',
            description: '',
            image: '',
        })
    };
    
    
    return (
        <form onSubmit={submitForm}>

            {/* you want the input name to match what I put in the object, they need to match or the api won't accept it */}
            {/* here's an example input */}
            {/*<label htmlFor="starting_price">Starting Price: </label>
            <input type="number" placeholder="Starting Price" name="starting_price" value={item.starting_price} onChange={handleChanges} /> */}

            <label> Add Item Form </label>
            <input
                id="name"
                placeholder="Name of the item"
                onChange={handleChanges}
                name="fname"
                value={item.title}
            />

            <label> Starting Price </label>
            <input
                id="startingPrice"
                placeholder="100.00"
                onChange={handleChanges}
                name="startingPrice"
                value={item.startingPrice}
            />

            <label> Date Starting </label>
            <input
                id="startingDate"
                placeholder="01/01/2020"
                onChange={handleChanges}
                name="startingDate"
                value={item.startingDate}
            />

            <label> Date Ending </label>
            <input
                id="endingDate"
                placeholder="01/01/2020"
                onChange={handleChanges}
                name="endingDate"
                value={item.endingDate}
            />

        <   label htmlFor="note">Description</label>
            <textarea
                name="description"
                onChange={handleChanges}
                value={item.body}
            />

        </form>
    )
}

//connect addAuction action to props
const mapDispatchToProps = {
    addAuction
}

export default connect([], mapDispatchToProps)(AddAuction);