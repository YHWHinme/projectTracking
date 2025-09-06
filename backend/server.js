import express from "express";

// Basic app configuration
const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Under development");
});

// TODO: Setup routing for post requests to localbackend

app.listen(3001);
