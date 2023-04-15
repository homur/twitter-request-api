require("dotenv").config();
const express = require("express");
const Twit = require("twit");

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const app = express();

const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
});

//Query sample: localhost:3000/tweets/somepost
app.get("/tweets/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const result = await T.get("search/tweets/recent", { q: searchTerm });
    res.send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving tweets");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Web service started on port 3000");
});
