const express = require("express");
const config = require("./config");
const Twit = require("twit");

const consumer_key = config.consumer_key;
const consumer_secret = config.consumer_secret;
const access_token = config.access_token;
const access_token_secret = config.access_token_secret;

const app = express();

const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
});

// Define a route to retrieve tweets
app.get("/tweets/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const result = await T.get("search/tweets", { q: searchTerm });
    res.send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving tweets");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Query example: localhost:3000/tweets/somepost
