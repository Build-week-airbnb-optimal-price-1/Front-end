// /Requirements:
//  Show properties of the property: housing type, beds, etc etc. 
//  Also have areas for returning pricing recommendations for property
//  Buttons for editing and deleting
import React from "react";


 const Property = props => {

	return (
    <>
      <div className="property" key={props.id}>
        <img src={props.photo} alt="Hosts showing their property" />
        <h2>{props.title}</h2>
        <h3>
          Predicted Price (in yen): ¥{props.predicted_price} (~$
          {(props.predicted_price * 0.0091).toFixed(2)})
        </h3>
        <div className="property-info">
          <p>Summary: {props.summary}</p>
          <p>Neighborhood: {props.neighbourhood_cleansed}</p>
          <p>Property Type: {props.property_type}</p>
          <p>Room Type: {props.room_type}</p>
          <p>Bathrooms: {props.bathrooms}</p>
          <p>Cleaning Fee Amount: {props.cleaning_fee}</p>
          <p>Minimum Night Stay: {props.minimum_nights}</p>
          <p>Number of Guests Allowed?: {props.accommodates}</p>
          <p>Instant Book?: {props.instant_bookable === 1 ? "Yes" : "No"}</p>
          <p>Kitchen?: {props.kitchen === 1 ? "Yes" : "No"}</p>
          <p>Smoke Detector?: {props.smoke_detector === 1 ? "Yes" : "No"}</p>
          <p>Self Check-in?: {props.self_check_in === 1 ? "Yes" : "No"}</p>
          <p>Hot Water?: {props.hot_water === 1 ? "Yes" : "No"}</p>
          <p>Host is Local?: {props.local_host}</p>
          <p>Host Response Rate: {props.host_response_rate}</p>
        </div>
        <button onClick={props.edit}>Edit</button>
        <button onClick={props.delete}>Delete</button>
      </div>
    </>
  );
 }

 export default Property;
