require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Twit = require("twit");
const app = express();

app.use(cors());

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
});

app.get("/checklimit", async (req, res) => {
  try {
    const result = await T.get(
      "application/rate_limit_status.json?resources=search"
    );
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

//Query sample: localhost:3000/tweets/somepost
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
  console.log(`Web service started on port ${port}`);
});
