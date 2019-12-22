// /Requirements:
//  Show properties of the property: housing type, beds, etc etc. 
//  Also have areas for returning pricing recommendations for property
//  Buttons for editing and deleting
 import React from "react";

 const Property = props => {
 		return (
 			<div className = "property">
				<img src = {props.photo} /> 
				<h2>{props.title}</h2>
		 		<h2>{props.price}</h2>
 				<div className = 'property-info'>
					<h3>{props.address}</h3>
		 			<p>Bedrooms: {props.beds}</p>
		 			<p>Bathrooms: {props.baths}</p>
				</div>
 			</div>
 	);
 }
 export default Property; 