// Requirements:
// Form for adding property, allow for ID, Title/Name, Location, Beds, Property Type, and other fields
// We'll have to be flexible with this based on what the DS students come back with as important fields
// have a generic function which accepts a field name - good to reduce boilerplate
// or have several specialized functions, one for each field - more flexible, it will allow to execute different logic depending on the field.

import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postProperty, saveEditProperty } from "../store/actions";

const AddProperty = props => {
	const [property, setProperty] = useState({
    photo: `https://picsum.photos/400/250?random=${Date.now()}`,
    title: "",
    summary: "",
    neighbourhood_cleansed: "",
    property_type: "",
    room_type: "",
    bathrooms: 0,
    cleaning_fee: 0,
    minimum_nights: 0,
    instant_bookable: 0,
    kitchen: 0,
    smoke_detector: 0,
    self_check_in: 0,
    accommodates: 0,
    hot_water: 0,
    local_host: 0,
    host_response_rate: 0,
    id: Date.now(),
    user_id: parseInt(localStorage.getItem("user_id"))
  });
	// Spread operator and Computed properties(ES6) - This is my changeHandler. It's still using my event from onChange but now I can dynamically set my keys in my objects with computed properties. 
	// I'm capturing the name attribute from wherever I fire the event. 
	const handleChanges = event => {
		setProperty({ ...property, [event.target.name]: event.target.value }); 
		console.log(event.target.name);
  }; 

  const handleNumbers = event => {
    setProperty({ ...property, [event.target.name]: parseInt(event.target.value) });
    console.log(event.target.name);
  }; 
  
  const handleClick = event => {
    setProperty({ ...property, [event.target.name]: (event.target.checked ? 1 : 0 ) });
    console.log(event.target.name);
  }; 

	const submitForm = event => {
		event.preventDefault();
		props.postProperty(localStorage.getItem("token"), property, props.history);
  };
  
	const editForm = event => {
    event.preventDefault();
    props.saveEditProperty(localStorage.getItem("token"), property, props.history);
  };

	return (
    <>
      {props.editPropertyStart ? (
        <h1>EDIT MODE for {`${props.currentProperty.id}`}</h1>
      ) : (
        <h1>ADD MODE</h1>
      )}
      {!props.postPropertyStart ? (
        <form onSubmit={props.editPropertyStart ? submitForm : editForm}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={handleChanges}
            value={
              props.editPropertyStart
                ? props.currentProperty.title
                : property.title
            }
          />
          <label htmlFor="summary">Summary Description</label>
          <textarea
            id="summary"
            rows="4"
            cols="50"
            name="summary"
            value={
              props.editPropertyStart
                ? props.currentProperty.summary
                : property.summary
            }
            onChange={handleChanges}
          />
          <label htmlFor="neighbourhood_cleansed">Neighborhood</label>
          <select
            onChange={handleChanges}
            value={
              props.editPropertyStart
                ? props.currentProperty.neighbourhood_cleansed
                : property.neighbourhood_cleansed
            }
            name="neighbourhood_cleansed"
            id="neighbourhood_cleansed"
          >
            <option value="">--Select One--</option>
            <option value="Shibuya Ku">Shibuya Ku</option>
            <option value="Sumida Ku">Sumida Ku</option>
            <option value="Nerima Ku">Nerima Ku</option>
            <option value="Setagaya Ku">Setagaya Ku</option>
            <option value="Arakawa Ku">Arakawa Ku</option>
            <option value="Shinjuku Ku">Shinjuku Ku</option>
            <option value="Mitaka Shi">Mitaka Shi</option>
            <option value="Adachi Ku">Adachi Ku</option>
            <option value="Katsushika Ku">Katsushika Ku</option>
            <option value="Meguro Ku">Meguro Ku</option>
            <option value="Toshima Ku">Toshima Ku</option>
            <option value="Koto Ku">Koto Ku</option>
            <option value="Shinagawa Ku">Shinagawa Ku</option>
            <option value="Minato Ku">Minato Ku</option>
            <option value="Suginami Ku">Suginami Ku</option>
            <option value="Komae Shi">Komae Shi</option>
            <option value="Akishima Shi">Akishima Shi</option>
            <option value="Bunkyo Ku">Bunkyo Ku</option>
            <option value="Taito Ku">Taito Ku</option>
            <option value="Itabashi Ku">Itabashi Ku</option>
            <option value="Ota Ku">Ota Ku</option>
            <option value="Edogawa Ku">Edogawa Ku</option>
            <option value="Machida Shi">Machida Shi</option>
            <option value="Kita Ku">Kita Ku</option>
            <option value="Higashimurayama Shi">Higashimurayama Shi</option>
            <option value="Nakano Ku">Nakano Ku</option>
            <option value="Hino Shi">Hino Shi</option>
            <option value="Hachioji Shi">Hachioji Shi</option>
            <option value="Musashino Shi">Musashino Shi</option>
            <option value="Koganei Shi">Koganei Shi</option>
            <option value="Kokubunji Shi">Kokubunji Shi</option>
            <option value="Ogasawara Mura">Ogasawara Mura</option>
            <option value="Okutama Machi">Okutama Machi</option>
            <option value="Kodaira Shi">Kodaira Shi</option>
            <option value="Akiruno Shi">Akiruno Shi</option>
            <option value="Chiyoda Ku">Chiyoda Ku</option>
            <option value="Chuo Ku">Chuo Ku</option>
            <option value="Fuchu Shi">Fuchu Shi</option>
            <option value="Fussa Shi">Fussa Shi</option>
            <option value="Tama Shi">Tama Shi</option>
            <option value="Nishitokyo Shi">Nishitokyo Shi</option>
            <option value="Chofu Shi">Chofu Shi</option>
            <option value="Hinohara Mura">Hinohara Mura</option>
            <option value="Ome Shi">Ome Shi</option>
            <option value="Kunitachi Shi">Kunitachi Shi</option>
            <option value="Oshima Machi">Oshima Machi</option>
            <option value="Higashiyamato Shi">Higashiyamato Shi</option>
            <option value="Hamura Shi">Hamura Shi</option>
            <option value="Tachikawa Shi">Tachikawa Shi</option>
            <option value="Inagi Shi">Inagi Shi</option>
            <option value="Musashimurayama Shi">Musashimurayama Shi</option>
            <option value="Niijima Mura">Niijima Mura</option>
            <option value="Hachijo Machi">Hachijo Machi</option>
            <option value="Miyake Mura">Miyake Mura</option>
            <option value="Higashikurume Shi">Higashikurume Shi</option>
          </select>
          <label htmlFor="property_type">Property Type</label>
          <select
            onChange={handleChanges}
            value={
              props.editPropertyStart
                ? props.currentProperty.property_type
                : property.property_type
            }
            name="property_type"
            id="property_type"
          >
            <option value="">--Select One--</option>
            <option value="Apartment">Apartment</option>
            <option value="Hotel">Hotel</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="room_type">Room Type</label>
          <select
            onChange={handleChanges}
            value={
              props.editPropertyStart
                ? props.currentProperty.room_type
                : property.room_type
            }
            name="room_type"
            id="room_type"
          >
            <option value="">--Select One--</option>
            <option value="Private room">Private room</option>
            <option value="Entire home/apt">Entire home/apt</option>
            <option value="Shared room">Shared room</option>
            <option value="Hotel room">Hotel room</option>
          </select>
          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            id="bathrooms"
            name="bathrooms"
            value={
              props.editPropertyStart
                ? props.currentProperty.bathrooms
                : property.bathrooms
            }
            onChange={handleNumbers}
          />
          <label htmlFor="cleaning_fee">Cleaning Fee</label>
          <input
            id="cleaning_fee"
            name="cleaning_fee"
            value={
              props.editPropertyStart
                ? props.currentProperty.cleaning_fee
                : property.cleaning_fee
            }
            onChange={handleNumbers}
          />
          <label htmlFor="minimum_nights">Minimum Night Stay</label>
          <input
            id="minimum_nights"
            name="minimum_nights"
            value={
              props.editPropertyStart
                ? props.currentProperty.minimum_nights
                : property.minimum_nights
            }
            onChange={handleNumbers}
          />
          <label htmlFor="accommodates">Number of Guests Allowed?</label>
          <input
            id="accommodates"
            name="accommodates"
            value={
              props.editPropertyStart
                ? props.currentProperty.accommodates
                : property.accommodates
            }
            onChange={handleNumbers}
          />
          <label htmlFor="instant_bookable">Instant Book?</label>
          <input
            id="instant_bookable"
            name="instant_bookable"
            value={
              props.editPropertyStart
                ? props.currentProperty.instant_bookable
                : property.instant_bookable
            }
            type="checkbox"
            onClick={handleClick}
          />
          <label htmlFor="kitchen">Kitchen?</label>
          {props.editPropertyStart ? (
            props.currentProperty.kitchen === 1 ? (
              <input
                id="kitchen"
                name="kitchen"
                defaultChecked
                type="checkbox"
                onClick={handleClick}
              />
            ) : (
              <input
                id="kitchen"
                name="kitchen"
                type="checkbox"
                onClick={handleClick}
              />
            )
          ) : (
            <input
              id="kitchen"
              name="kitchen"
              type="checkbox"
              onClick={handleClick}
            />
          )}
          <label htmlFor="smoke_detector">Smoke Detector?</label>
          {props.editPropertyStart ? (
            props.currentProperty.kitchen === 1 ? (
              <input
                id="smoke_detector"
                name="smoke_detector"
                defaultChecked
                type="checkbox"
                onClick={handleClick}
              />
            ) : (
              <input
                id="smoke_detector"
                name="smoke_detector"
                type="checkbox"
                onClick={handleClick}
              />
            )
          ) : (
            <input
              id="smoke_detector"
              name="smoke_detector"
              type="checkbox"
              onClick={handleClick}
            />
          )}
          <label htmlFor="self_check_in">Self Check In?</label>
          {props.editPropertyStart ? (
            props.currentProperty.kitchen === 1 ? (
              <input
                id="self_check_in"
                name="self_check_in"
                defaultChecked
                type="checkbox"
                onClick={handleClick}
              />
            ) : (
              <input
                id="self_check_in"
                name="self_check_in"
                type="checkbox"
                onClick={handleClick}
              />
            )
          ) : (
            <input
              id="self_check_in"
              name="self_check_in"
              type="checkbox"
              onClick={handleClick}
            />
          )}
          <label htmlFor="hot_water">Hot Water?</label>
          {props.editPropertyStart ? (
            props.currentProperty.hot_water === 1 ? (
              <input
                id="hot_water"
                name="hot_water"
                defaultChecked
                type="checkbox"
                onClick={handleClick}
              />
            ) : (
              <input
                id="hot_water"
                name="hot_water"
                type="checkbox"
                onClick={handleClick}
              />
            )
          ) : (
            <input
              id="hot_water"
              name="hot_water"
              type="checkbox"
              onClick={handleClick}
            />
          )}
          <label htmlFor="local_host">Is the host local?</label>
          {props.editPropertyStart ? (
            props.currentProperty.local_host === 1 ? (
              <input
                id="local_host"
                name="local_host"
                defaultChecked
                type="checkbox"
                onClick={handleClick}
              />
            ) : (
              <input
                id="local_host"
                name="local_host"
                type="checkbox"
                onClick={handleClick}
              />
            )
          ) : (
            <input
              id="local_host"
              name="local_host"
              type="checkbox"
              onClick={handleClick}
            />
          )}
          <label htmlFor="host_response_rate">
            Host response rate from 1-100
          </label>
          <input
            id="host_response_rate"
            name="host_response_rate"
            value={property.host_response_rate}
            onChange={handleNumbers}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h1>Posting...</h1>
      )}
      {props.postPropertyError && (
        <p style={{ color: "red", marginTop: "10vh" }}>
          Welp, looks like it's on fire again
        </p>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  properties: state.properties,
  postPropertyError: state.postPropertyError,
  postPropertyStart: state.postPropertyStart,
  editPropertyStart: state.editPropertyStart,
  currentProperty: state.currentProperty
});

export default connect(mapStateToProps, { postProperty, saveEditProperty })(
  withRouter(AddProperty)
);

















