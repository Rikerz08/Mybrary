const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

//export info from this router to the main server js
module.exports = router;
