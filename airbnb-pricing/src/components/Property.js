// /Requirements:
//  Show properties of the property: housing type, beds, etc etc. 
//  Also have areas for returning pricing recommendations for property
//  Buttons for editing and deleting
 import React from "react";

 const Property = props => {
	return (
		<div className = "property">
			<img src={props.photo} alt="Hosts showing their property" /> 
			<h2>{props.title}</h2>
			<h2>{props.price}</h2>
			<div className='property-info'>
				<p>Summary: {props.summary}</p>
				<p>Neighborhood: {props.neighbourhood_cleansed}</p>
				<p>Property Type: {props.property_type}</p>
				<p>Room Type: {props.room_type}</p>
				<p>Bathrooms: {props.bathrooms}</p>
				<p>Cleaning Fee Amount: {props.cleaning_fee}</p>
				<p>Minimum Night Stay: {props.minimum_nights}</p>
				<p>Instant Book?: {props.instant_bookable}</p>
				<p>Kitchen?: {props.kitchen}</p>
				<p>Smoke Detector?: {props.smoke_detector}</p>
				<p>Self Check-in?: {props.self_check_in}</p>
				<p>Hot Water?: {props.hot_water}</p>
			</div>
		</div>
 	);
 }
 export default Property; 
