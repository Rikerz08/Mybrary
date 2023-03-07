// check if we are running in the production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

//require the router file of index
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//tell app to use index router
app.use("/", indexRouter);

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
