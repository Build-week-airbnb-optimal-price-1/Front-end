// Requirements:
// Form for adding property, allow for ID, Title/Name, Location, Beds, Property Type, and other fields
// We'll have to be flexible with this based on what the DS students come back with as important fields
// have a generic function which accepts a field name - good to reduce boilerplate
// or have several specialized functions, one for each field - more flexible, it will allow to execute different logic depending on the field.

import React, { useState } from 'react';

const AddProperty = props => {
	const [property, setProperty] = useState({ title: "", body: "" });
	// Spread operator and Computed properties(ES6) - This is my changeHandler. It's still using my event from onChange but now I can dynamically set my keys in my objects with computed properties. 
	// I'm capturing the name attribute from wherever I fire the event. 
	const handleChanges = event => {
		setProperty({ ...property, [event.target.name]: event.target.value }); // Key value pair
		console.log(event.target.name);
	}; 

	const submitForm = event => {
		event.preventDefault();
		props.addNewProperty(property);
		setProperty({ title: "", body: "" }) // To clear out inputs - Re-updating our state to empty strings
	};

	return (
		<form onSubmit={submitForm}>
			<label htmlFor="title">Property Title</label>
			<input 
				id="title" 
				type="text" 
				name="title" 
				onChange={handleChanges}
				value={property.title} 
			/>
				<label htmlFor="location">Property Location</label>
				<textarea 
					id="location" 
					name="body" 
					// eslint-disable-next-line no-restricted-globals
					value={property.body}
					onChange={handleChanges} 
				/>
				<button type="submit">Submit</button>
		</form>
	);
};

export default AddProperty;



















