const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

const resources = require(path.join(__dirname, "..", "data.json"));
// const pathToFile = path.resolve("./data.json");

router.get("/", (req, res) => {
  const activeResource = resources.find((resource) => resource.status === "active");
  res.send(activeResource);
});

module.exports = router;
