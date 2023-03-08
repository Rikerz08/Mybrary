const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    // Regular expression searches the whole database even if part lang of the name imo i search
    //  i.e It will still display "John" even if "Jo" lang imo na search
    // "i" param just tells it to be case insensitive
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
  res.render("authors/index");
});

// New author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create new user
router.post("/", async (req, res) => {
  // store the author name into the author object
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

//export info from this router to the main server js
module.exports = router;
