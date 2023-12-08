const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);

  fs.readFile(path.join(__dirname, "../../data.json"), (err, data) => {
    const jsonData = JSON.parse(data);
    const user = jsonData.find((user) => user.id === userId);
    res.json(user);
  });
});

router.patch("/:id", (req, res) => {
  const userId = Number(req.params.id);
  fs.readFile(path.join(__dirname, "../../data.json"), (err, data) => {
    const jsonData = JSON.parse(data);
    const user = jsonData.find((user) => user.id === userId);
    Object.entries(req.body).forEach((entry) => {
      const [key, value] = entry;
      user[key] = value;
    });

    fs.writeFile(
      path.join(__dirname, "../../data.json"),
      JSON.stringify(jsonData, null, 2),
      "utf-8",
      (err) => {
        res.json(user);
      }
    );
  });
});

module.exports = router;
