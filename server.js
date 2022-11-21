const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const env = require("dotenv");
const helmet = require("helmet");
const ApiError = require("./error/apiError");
const globalError = require("./middleware/globalError");
const dbConnection = require("./config/dbConnection");

env.config({ path: "config.env" });
app.use(helmet());
if (process.env.PROJECT === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV} `);
}
//Connect db
dbConnection();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route Mount
app.use("/api/v1/user", require("./routes/user.routes"));
//handler Error
app.all("*", (req, res, next) => {
  next(new ApiError(`this route is Not Found ${req.originalUrl}`, 404));
});

//error middleware handler
app.use(globalError);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

process.on("rejectionHandled", (err) => {
  console.error(`rejectionHandled ${err.name} || ${err.message}`);
  server.close(() => {
    console.error("Showet Down.....");
    process.exit(1);
  });
});
