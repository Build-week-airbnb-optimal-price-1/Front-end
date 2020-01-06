import React from 'react';
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup";
import PropertyList from "./components/PropertyList";

function App(props) {

  const [properties, setProperties] = useState([]);

  const addNewProperty = property => {
    const newProperty = {
      id: Date.now(),
      title: property.title,
      body: property.body
    };
    setProperties([...properties, newProperty])
  }
  // Spread operator -  We want the whole array of objects to come down and then add new properties to the original array.
  // Don't mutate the array - push to the array is not a sound approach. React will not know that sth has changed. React is only re-rendering when either the props or the state change. Mutating the sate object, or any nested object, keeps the identity of the object, and React thinks nothing has changed. We have to clal setState with a new value to let React know it should re-render. 

  // searchTerm will save the data from the search input on every occurance of the change event. 
  const [searchTerm, setSearchTerm] = useState("");

  // searchResults is used to set the search result. 
  const [searchResults, setSearchResults] = useState([]);

  // The handleChange method takes the event object as the argument and sets the current value of the form to the searchTerm state using seSearchTerm.
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  
  // We need to create a useEffect when we are watching for something
  useEffect(() => {
    const getSearch = () => {
      axios
        .get("https://data.ny.gov/resource/jcxg-7gnm.json/") // AirBnB API key here
        .then(response => {
          console.log("API Is Here: ", response.data);
          setProperties(response.data);
        })
        .catch(error => {
          console.log("Whoops go back, thats an error!", error);
        });
    };

    const results = properties.filter(stat => {
      return (
        stat.fish_spec.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stat.county.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    getSearch();
    setSearchResults(results);
    //eslint-disable-next-line
  }, [searchTerm]);
  console.log(properties); 

  const submitForm = event => {
    event.preventDefault();
    addNewProperty(properties);
    setProperties({ title: "", body: "" }); // To clear out inputs - Re-updating our state to empty strings
  };
 
  return (
    <div className="App">
      <h1>My Property in Tokyo</h1>
      {/* we are going to pass a function down as a prop */}
      <AddProperty properties={properties} addNewProperty={addNewProperty} />
      {/* <Property properties={properties} /> */}
      <form onSubmit={submitForm}>
        {/* We apply two-way data binding to the input field, which basically takes the value from the user and saves it into the satte. */}
        {/* Two-way binding just means that: When properties in the model get updated, so does the UI. When UI elements get updated, the changes get propagated back to the model. */}
        <label htmlFor="name">Search Properties:</label>
        <input
          id="name"
          type="text"
          name="textfield"
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
        />
        <button type="sbumit">Apply</button>
      </form>
      <div className="property-list">
        <ul>
          {searchResults.map(property => (
            <Property
              photo={property.photo}
              title={property.fish_spec}
              price={property.price}
              address={property.county}
              beds={property.bedrooms}
              baths={property.bathrooms}
            />
          ))}
        </ul>
      </div>
    </div>

    {/* This will be the only thing that remains */}
    <Router>
      <Switch>
        <PrivateRoute path="/properties" exact component={loggedIn ? PropertyList : Signup} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  loginStart: state.loginStart
});

export default connect(mapStateToProps, { logout })(withRouter(App));
