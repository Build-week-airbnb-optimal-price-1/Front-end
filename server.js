const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();
const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());

let properties = [
  {
    photo: "https://picsum.photos/400/250?random=1",
    title: "Tokyo House",
    summary: "This is a nice little place",
    neighbourhood_cleansed: "Setagaya Ku",
    property_type: "House",
    room_type: "Shared room",
    bathrooms: "2",
    cleaning_fee: "200",
    minimum_nights: "2",
    instant_bookable: true,
    kitchen: true,
    smoke_detector: true,
    self_check_in: true,
    hot_water: true,
    id: 1
  }
];

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        token: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/listings", authenticator, (req, res) => {
  res.send(properties);
});

app.post("/api/listings/insertlisting", authenticator, (req, res) => {
  if (req.body.property !== undefined && req.body.code !== undefined) {
    const newproperty = req.body;
    newproperty.id = nextId;
    properties.push(newproperty);
  }
  nextId = nextId + 1;
  res.status(201).json(properties);
});

app.put("/api/listings/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the property id");
  if (req.body.id === undefined || !req.body.property || !req.body.code) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  properties = properties.map(property => {
    if (`${property.id}` === req.params.id) {
      return req.body;
    }
    return property;
  });
  res.status(200).send(req.body);
});

app.delete("/api/listings/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the property id");
  properties = properties.filter(property => `${property.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5500, () => {
  console.log("Server listening on port 5500");
});
