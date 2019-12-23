// Requirements:
// List out properties
// Maybe keep minimal information so that peple click through
// Tyler
import React, { useState, useEffect } from "react";
import ListItem from './ListItem';
import axios from "axios";

// // Use this to create a new form
const PropertyList = props => {
    const [properties, setProperties] = useState();

    useEffect(() => {
        axios.get(backend.api)
        .then(response => {
            console.log(response)
            setProperties(response.data)
        })
        .catch(error => console.log(error))
    }, [])

    console.log(properties);
    
    return (
        properties.map(property => <ListItem 
                                        key = {property.id}  
                                        photo = {property.photo}
                                        title = {property.title}
                                        address = {property.address}
                                        price = {property.price}
                                    />)
    );
} 
export default PropertyList;
