require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

//Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_MONGOOSE_CREDENTIALS)
  .then(() => console.log("connected"))
  .catch((err) => console.error(err));
// ------------------------------------- //
//My Routes
const influencerRouter = require("./routes/influencer");
const policyRouter = require("./routes/policy");
const purchaseRouter = require("./routes/purchase");
// ------------------------------------- //
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
// app.use my routes
app.use("/api/influencers", influencerRouter);
app.use("/api/policies", policyRouter);
app.use("/api/purchases", purchaseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
