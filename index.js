const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Enable Helmet middleware with default options
app.use(helmet());

// Define a route to handle search requests
app.get("/search/:term/:media", async (req, res) => {
  const term = req.params.term;
  const media = req.params.media;

  try {
    // Make a request to the iTunes Search API using fetch
    const response = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=${media}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching data from iTunes API" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
