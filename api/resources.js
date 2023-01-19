const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

const resources = require(path.join(__dirname, "..", "data.json"));
const pathToFile = path.resolve("./data.json");
//const stringifiedData = fs.readFileSync(pathToFile);
//const resources = JSON.parse(stringifiedData);

router.get("/", (req, res) => {
  res.send(resources);
});

router.get("/:id", (req, res) => {
  const resourceId = req.params.id;
  let resource = resources.find((record) => record.id === resourceId);
  res.send(resource);
});

router.post("/", (req, res) => {
  const resource = req.body.form;
  resource.createdAt = new Date();
  resource.status = "inactive";
  resource.id = Date.now().toString();
  resources.unshift(resource);
  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
    if (error) return res.status(422).send("Cannot store data in the file!");
    return res.send("data has been received");
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const index = resources.findIndex((r) => r.id === id);
  const activeResource = resources.find((r) => r.status === "active" && r.id !== id);

  if (index > -1) {
    //resource is completed
    if (resources[index].status === "complete") {
      return res.status(422).send("Cannot update because resource has been completed");
    }
    //active resource related functionality

    resources[index] = req.body.form;

    if (req.body.form.status === "active") {
      if (activeResource) {
        return res.status(422).send("There is active resource already");
      }
      resources[index].status = "active";
      resources[index].activationTime = new Date();
    }

    fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
      if (error) return res.status(422).send("Cannot store data in the file!");
      return res.send("data has been updated");
    });
  } else {
    return res.status(422).send("Resource not found");
  }
});

module.exports = router;
