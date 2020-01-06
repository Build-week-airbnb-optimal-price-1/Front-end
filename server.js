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
    photo: "https://picsum.photos/200/300",
    title: "Berlin House",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 1
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 2",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 2
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 3",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 3
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 4",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 4
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 5",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 5
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 6",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 6
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House 7",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 7
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 8
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 9
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 10
  },
  {
    photo: "https://picsum.photos/200/300",
    title: "Berlin House",
    baths: 3,
    beds: 3,
    price_recommendations: {
      price_1: "150",
      price_2: "140",
      price_3: "145",
      price_4: "162",
      price_5: "171",
      price_6: "131",
      price_7: "126"
    },
    address: "1234 N Whatever Ave",
    id: 11
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

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/properties", authenticator, (req, res) => {
  res.send(properties);
});

app.post("/api/properties", authenticator, (req, res) => {
  if (req.body.property !== undefined && req.body.code !== undefined) {
    const newproperty = req.body;
    newproperty.id = nextId;
    properties.push(newproperty);
  }
  nextId = nextId + 1;
  res.status(201).json(properties);
});

app.put("/api/properties/:id", authenticator, (req, res) => {
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

app.delete("/api/properties/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the property id");
  properties = properties.filter(property => `${property.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
