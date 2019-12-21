import React, { useState, useEffect } from 'react';
// import ReactDom from "react-dom";
import AddProperty from "./components/AddProperty";
import Property from "./components/Property";
import './App.css';

// state set up
function App() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "",
      location: "",
      beds: "",
      type: ""
    }
  ]);

  const addNewProperty = property => {
    const newProperty = {
      id: Date.now(),
      title: property.title,
      location: property.body
    };
    setProperties([...properties, newProperty])
  }
  // Spread operator -  We want the whole array of objects to come down and then add new properties to the original array.
  // Don't mutate the array - push to the array is not a sound approach. React will not know that sth has changed. React is only re-rendering when either the props or the state change. Mutating the sate object, or any nested object, keeps the identity of the object, and React thinks nothing has changed. We have to clal setState with a new value to let React know it should re-render. 

  // searchTerm will save the data from the search input on every occurance of the change event. 
  const [searchTerm, setSearchTerm] = useState("");
  // searchResults is used to set the search result. 
  const [searchResults, setSearchResults] = useState([]);

  // My response.data from an API
  useEffect(() => {
    const results = properties.filter(property => {
      return 
        property.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results)
  }, [searchTerm]);

  // The handleChange method takes the event object as the argument and sets the current value of the form to the searchTerm state using seSearchTerm.
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  
  return (
    <div className="App">
      <h1>My Property</h1>
      {/* we are going to pass a function down as a prop */}
      <AddProperty properties={properties} addNewProperty={addNewProperty} />
      {/* <Property properties={properties} /> */}
    <form>
      {/* We apply two-way data binding to the input field, which basically takes the value from the user and saves it into the satte. */}
      {/* Two-way binding just means that: When properties in the model get updated, so does the UI. When UI elements get updated, the changes get propagated back to the model. */}
      <label htmlFor="name">Search:</label>
      <input 
        id="name" 
        type="text" 
        name="textfield" 
        placeholder="Search"
        onChange={handleChange} 
        value={searchTerm} />
    </form >
    <div className="property-list">
      <ul>
       {searchResults.map
       (property => (
         <li key={property}>{property}</li>
       ))}
      </ul>
    </div>
  </div >
  );
}

export default App;
