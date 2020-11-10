// Requirements:
// List out properties
// Maybe keep minimal information so that peple click through
// Tyler
import React, { useEffect } from "react";
import Property from "./Property";
import Header from "./Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProperties, deleteProperty, editProperty } from "../store/actions";
import style from "styled-components";

//import axios from "axios";
//import Spinner from "react-spinner";

const Loading = style.div`
  margin: 200px auto;
  text-align: center;
`;

const PropertyList = (props) => {
  const deletePropertyButton = (e, property) => {
    e.stopPropagation();
    props.deleteProperty(localStorage.getItem("token"), property);
  };

  const editPropertyButton = (e, property) => {
    e.stopPropagation();
    props.editProperty(localStorage.getItem("token"), property, props.history);
    // props.editProperty(localStorage.getItem("token"), id, props.history);
  };

  const { postPropertySuccess, getProperties } = props;

  useEffect(() => {
    getProperties(localStorage.getItem("token"));
  }, [postPropertySuccess, getProperties]);

  //, props.saveEditPropertySuccess, props.loginSuccess

  return (
    <>
      <Header />
      {props.getPropertiesStart ? (
        <>
          <Loading>Loading...</Loading>
        </>
      ) : (
        <>
          {props.properties && props.properties.length > 0 ? (
            props.properties.map((property) => {
              return (
                <>
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
                    accommodates={property.accommodates}
                    instant_bookable={property.instant_bookable}
                    kitchen={property.kitchen}
                    smoke_detector={property.smoke_detector}
                    self_check_in={property.self_check_in}
                    hot_water={property.hot_water}
                    host_location={property.host_location}
                    host_response_rate={property.host_response_rate}
                    predicted_price={property.predicted_price}
                    delete={(e) => deletePropertyButton(e, property)}
                    edit={(e) => editPropertyButton(e, property)}
                  />
                </>
              );
            })
          ) : (
            <>
              <Loading>No properties! Maybe try and add one...</Loading>
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  properties: state.properties,
  getPropertiesStart: state.getPropertiesStart,
  postPropertySuccess: state.postPropertySuccess,
  saveEditPropertySuccess: state.saveEditPropertySuccess,
  loginSuccess: state.loginSuccess,
});

export default connect(mapStateToProps, {
  getProperties,
  deleteProperty,
  editProperty,
})(withRouter(PropertyList));
