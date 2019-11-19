import React, { useState, useEffect } from 'react';
import api from '../Utils/api';
import Items from './AddAuctionCard';

// Labels needed for form
    // 1. Name
    // 2. starting_price
    // 3. date_starting
    // 4. date_ending
    // 5. description
    // 6. image

const AddAuction = (props) => {
    const [item, setItem] = useState({ title: "", body: "" });

    const handleChanges = e => {
        console.log(note);
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const submitForm = e => {
        e.preventDefault();
        props.addNewNote(item);
        setItem({ title: "", body: "" });
    };
    
    
    return (
        <form onSubmit={submitForm}>
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
                id="note"
                name="body"
                onChange={handleChanges}
                value={item.body}
            />

        </form>
    )
}

export default AddAuction;