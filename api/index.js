const express = require("express");
const path = require("path");

const router = express.Router();

const resources = require(path.join(__dirname, "resources.js"));
const activeResource = require(path.join(__dirname, "active-resources.js"));

router.use("/resources", resources);
router.use("/activeresource", activeResource);

router.get("/", (req, res) => {
  res.send("Hello api");
});

module.exports = router;
