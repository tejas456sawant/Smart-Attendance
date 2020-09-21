/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var checkFace = require("./routes/checkFace");
var timeTable = require("./routes/table");
var markAttendance = require("./routes/markAttendance");
var registerStudent = require("./routes/registerStudent");
var showAttedance = require("./routes/showAttendance");
var updateInfo = require("./routes/updateInfo");
var login = require("./routes/login");
var filters = require("./routes/filters");
var getall = require("./routes/getAll");
var setall = require("./routes/setAll");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", registerStudent);
app.use("/checkFace", checkFace);
app.use("/table", timeTable);
app.use("/attendance", markAttendance);
app.use("/showAttendance", showAttedance);
app.use("/login", login);
app.use("/updateInfo", updateInfo);
app.use("/filter", filters);
app.use("/get", getall);
app.use("/set", setall);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
