// Requirements:
// List out properties
// Maybe keep minimal information so that peple click through
// Tyler
import React, { useState, useEffect } from "react";
import Property from "./Property";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProperties } from "../store/actions";
//import axios from "axios";
//import Spinner from "react-spinner";

const PropertyList = props => {

	useEffect(() => {
		props.getProperties(props.token);
	}, []);
	return (
    <>
      <h1> STUFF </h1>
      {props.getPropertiesStart ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h1>SUCCESS!</h1>
          {props.properties && props.properties.map(property => {
			console.log(property);
			return (
				<Property
				key={property.id}
				photo={property.photo}
				title={property.title}
        summary={property.summary}
        neighbourhood_cleansed={property.neighbourhood_cleansed}
        property_type={property.property_type}
        room_type={property.room_type}
        bathrooms={property.bathrooms}
        cleaning_fee={property.cleaning_fee}
        minimum_nights={property.minimum_nights}
        instant_bookable={property.instant_bookable}
        kitchen={property.kitchen}
        smoke_detector={property.smoke_detector}
        self_check_in={property.self_check_in}
        hot_water={property.hot_water}
				/>
      		)
          })}
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  token: state.token,
  properties: state.properties,
  getPropertiesStart: state.getPropertiesStart
});

export default connect(mapStateToProps, { getProperties })(withRouter(PropertyList));


