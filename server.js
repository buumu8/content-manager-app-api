const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
const api = require(path.join(__dirname, "api", "index.js"));

const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
