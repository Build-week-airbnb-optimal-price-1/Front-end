// Requirements:
// List out properties
// Maybe keep minimal information so that peple click through
// Tyler
import React from "react";
import Property from "./Property";
import axios from "axios";

// // Use this to create a new form
const PropertyList = props => {
    const [properties, setProperties] = useState();

    axios.get(backend.api)
        .then(response => {
            console.log(response)
            setProperties(response.data)
        })
        .catch(error => console.log(error))
    
    console.log(properties);
    
    return (
        properties.map(property => <Property 
                                        photo = {property.photo} 
                                        title = {property.title} 
                                        body = {property.body} 
                                    />)
    );
}
export default PropertyList;
