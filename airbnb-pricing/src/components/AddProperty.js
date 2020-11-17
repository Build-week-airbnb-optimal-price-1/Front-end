// Requirements:
// Form for adding property, allow for ID, Title/Name, Location, Beds, Property Type, and other fields
// We'll have to be flexible with this based on what the DS students come back with as important fields
// have a generic function which accepts a field name - good to reduce boilerplate
// or have several specialized functions, one for each field - more flexible, it will allow to execute different logic depending on the field.

import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postProperty, saveEditProperty } from "../store/actions";
import style from "styled-components";

const AddEditContainer = style.div`
  display: flex;
  height: 100%;
`;

const FormLeft = style.div`
  width: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = style.form`
  width: 100%;
  padding: 0 100px;
  overflow: auto;
  flex: 1;
  margin-bottom: 80px;
`;

const FormTitle = style.h1`
  font-size: 26px;
  font-weight: 900;
  color: #363131;
`;

const Label = style.label`
  font-size: 12px;
  font-weight: 600;
  color: #8f8d8d;
  margin-top: 10px;
`;

const Button = style.button`
    background-color: #2281bf;
    color: #fff;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    &:disabled {
      opacity: .5;
    }
    &:hover {
      background-color: #249EEE;
    }
  }
`;

const Quote = style.h2`
  width: 347px;
  height: 210px;
  font-weight: 500;
  color: #fff;
  font-size: 24px;
  line-height: 1.5;
`;

const FormInput = style.input`
  border: 1px solid #a9a9a9;
  padding: 10px;
  width: 100%;
  border-radius: 3px;
  border: solid 1px #e2e0e0;
  background-color: #f3f3f3;
  box-sizing: border-box;
  margin-top: 10px;
`;

const FormRight = style.div`
  width: 66.66%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #2281bf;
`;

const AddProperty = props => {
	const [property, setProperty] = useState({
    photo: `https://picsum.photos/400/250?random=${Date.now()}`,
    title: props.editPropertyStart ? props.currentProperty.title : "",
    summary: props.editPropertyStart ? props.currentProperty.summary : "",
    neighbourhood_cleansed: props.editPropertyStart ? props.currentProperty.neighbourhood_cleansed : "",
    property_type: props.editPropertyStart ? props.currentProperty.property_type : "",
    room_type: props.editPropertyStart ? props.currentProperty.room_type : "",
    bathrooms: props.editPropertyStart ? props.currentProperty.bathrooms : 0,
    cleaning_fee: props.editPropertyStart ? props.currentProperty.cleaning_fee : 0,
    minimum_nights: props.editPropertyStart ? props.currentProperty.minimum_nights : 0,
    instant_bookable: props.editPropertyStart ? props.currentProperty.instant_bookable : 0,
    kitchen: props.editPropertyStart ? props.currentProperty.kitchen : 0,
    smoke_detector: props.editPropertyStart ? props.currentProperty.smoke_detector : 0,
    self_check_in: props.editPropertyStart ? props.currentProperty.self_check_in : 0,
    accommodates: props.editPropertyStart ? props.currentProperty.accommodates : 0,
    hot_water: props.editPropertyStart ? props.currentProperty.hot_water : 0,
    local_host: props.editPropertyStart ? props.currentProperty.local_host : 0,
    host_response_rate: props.editPropertyStart ? props.currentProperty.host_response_rate : 0,
    id: props.editPropertyStart ? props.currentProperty.id : Date.now(),
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
      <AddEditContainer>
        <FormLeft>
          <FormTitle>
            {props.editPropertyStart ? "Edit" : "Add"} Property
          </FormTitle>
          <FormContainer
            onSubmit={props.editPropertyStart ? editForm : submitForm}
          >
            <Label htmlFor="title">Title</Label>
            <FormInput
              required
              id="title"
              type="text"
              name="title"
              onChange={handleChanges}
              value={property.title}
            />
            <Label htmlFor="summary">Summary Description</Label>
            <textarea
              id="summary"
              rows="4"
              cols="50"
              name="summary"
              value={property.summary}
              onChange={handleChanges}
            />
            <Label htmlFor="neighbourhood_cleansed">Neighborhood</Label>
            <select
              onChange={handleChanges}
              value={property.neighbourhood_cleansed}
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
            <Label htmlFor="property_type">Property Type</Label>
            <select
              onChange={handleChanges}
              value={property.property_type}
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
            <Label htmlFor="room_type">Room Type</Label>
            <select
              onChange={handleChanges}
              value={property.room_type}
              name="room_type"
              id="room_type"
            >
              <option value="">--Select One--</option>
              <option value="Private room">Private room</option>
              <option value="Entire home/apt">Entire home/apt</option>
              <option value="Shared room">Shared room</option>
              <option value="Hotel room">Hotel room</option>
            </select>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <FormInput
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={property.bathrooms}
              onChange={handleNumbers}
            />
            <Label htmlFor="cleaning_fee">Cleaning Fee</Label>
            <FormInput
              id="cleaning_fee"
              type="number"
              name="cleaning_fee"
              value={property.cleaning_fee}
              onChange={handleNumbers}
            />
            <Label htmlFor="minimum_nights">Minimum Night Stay</Label>
            <FormInput
              id="minimum_nights"
              type="number"
              name="minimum_nights"
              value={property.minimum_nights}
              onChange={handleNumbers}
            />
            <Label htmlFor="accommodates">Number of Guests Allowed?</Label>
            <FormInput
              id="accommodates"
              type="number"
              name="accommodates"
              value={property.accommodates}
              onChange={handleNumbers}
            />
            <Label htmlFor="instant_bookable">Instant Book?</Label>
            <FormInput
              id="instant_bookable"
              name="instant_bookable"
              value={property.instant_bookable}
              type="checkbox"
              onClick={handleClick}
            />
            <Label htmlFor="kitchen">Kitchen?</Label>
            {props.editPropertyStart ? (
              props.currentProperty.kitchen === 1 ? (
                <FormInput
                  id="kitchen"
                  name="kitchen"
                  defaultChecked
                  type="checkbox"
                  onClick={handleClick}
                />
              ) : (
                <FormInput
                  id="kitchen"
                  name="kitchen"
                  type="checkbox"
                  onClick={handleClick}
                />
              )
            ) : (
              <FormInput
                id="kitchen"
                name="kitchen"
                type="checkbox"
                onClick={handleClick}
              />
            )}
            <Label htmlFor="smoke_detector">Smoke Detector?</Label>
            {props.editPropertyStart ? (
              props.currentProperty.kitchen === 1 ? (
                <FormInput
                  id="smoke_detector"
                  name="smoke_detector"
                  defaultChecked
                  type="checkbox"
                  onClick={handleClick}
                />
              ) : (
                <FormInput
                  id="smoke_detector"
                  name="smoke_detector"
                  type="checkbox"
                  onClick={handleClick}
                />
              )
            ) : (
              <FormInput
                id="smoke_detector"
                name="smoke_detector"
                type="checkbox"
                onClick={handleClick}
              />
            )}
            <Label htmlFor="self_check_in">Self Check In?</Label>
            {props.editPropertyStart ? (
              props.currentProperty.kitchen === 1 ? (
                <FormInput
                  id="self_check_in"
                  name="self_check_in"
                  defaultChecked
                  type="checkbox"
                  onClick={handleClick}
                />
              ) : (
                <FormInput
                  id="self_check_in"
                  name="self_check_in"
                  type="checkbox"
                  onClick={handleClick}
                />
              )
            ) : (
              <FormInput
                id="self_check_in"
                name="self_check_in"
                type="checkbox"
                onClick={handleClick}
              />
            )}
            <Label htmlFor="hot_water">Hot Water?</Label>
            {props.editPropertyStart ? (
              props.currentProperty.hot_water === 1 ? (
                <FormInput
                  id="hot_water"
                  name="hot_water"
                  defaultChecked
                  type="checkbox"
                  onClick={handleClick}
                />
              ) : (
                <FormInput
                  id="hot_water"
                  name="hot_water"
                  type="checkbox"
                  onClick={handleClick}
                />
              )
            ) : (
              <FormInput
                id="hot_water"
                name="hot_water"
                type="checkbox"
                onClick={handleClick}
              />
            )}
            <Label htmlFor="local_host">Is the host local?</Label>
            {props.editPropertyStart ? (
              props.currentProperty.local_host === 1 ? (
                <FormInput
                  id="local_host"
                  name="local_host"
                  defaultChecked
                  type="checkbox"
                  onClick={handleClick}
                />
              ) : (
                <FormInput
                  id="local_host"
                  name="local_host"
                  type="checkbox"
                  onClick={handleClick}
                />
              )
            ) : (
              <FormInput
                id="local_host"
                name="local_host"
                type="checkbox"
                onClick={handleClick}
              />
            )}
            <Label htmlFor="host_response_rate">
              Host response rate from 1-100
            </Label>
            <FormInput
              id="host_response_rate"
              type="number"
              name="host_response_rate"
              value={property.host_response_rate}
              onChange={handleNumbers}
            />
            {props.postPropertyStart || props.saveEditPropertyStart ? (
              <Button type="submit" disabled>
                Submitting...
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
            {(props.postPropertyError || props.saveEditPropertyError) && (
              <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
                Welp, looks like it's on fire again
              </p>
            )}
          </FormContainer>
        </FormLeft>
        <FormRight>
          <Quote>
            "This app is a fabulous solution to the often strenuous search for the perfect Airbnb. I'll be using this for all my bookings."
          </Quote>
        </FormRight>
      </AddEditContainer>
    </>
  );
};

const mapStateToProps = state => ({
  properties: state.properties,
  postPropertyError: state.postPropertyError,
  postPropertyStart: state.postPropertyStart,
  editPropertyStart: state.editPropertyStart,
  saveEditPropertyStart: state.saveEditPropertyStart,
  saveEditPropertyError: state.saveEditPropertyError,
  currentProperty: state.currentProperty
});

export default connect(mapStateToProps, { postProperty, saveEditProperty })(
  withRouter(AddProperty)
);

















