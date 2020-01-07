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
				price={property.price}
				address={property.address}
				beds={property.beds}
				baths={property.baths}
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


