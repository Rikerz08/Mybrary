// check if we are running in the production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
// Bodyparser is a library that lets express access the variables of the author names
const bodyParser = require("body-parser");

//require the router file of index
const indexRouter = require("./routes/index");
// require author router
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//tell app to use routers
app.use("/", indexRouter);
app.use("/authors", authorRouter);

//import mongodb integration
const mongoose = require("mongoose");
//we gotta get the DB URL from an env file so that we dont hard code it on server js
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
// error message to see if we connected to mongoose
db.on("error", (error) => console.error(error));
//affirm message to see if we connected successfully
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(process.env.PORT || 3000);
