const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./src/middleware/errorMiddleware");

const routerUsers = require("./src/routes/routerUsers")
const routerPreducts = require("./src/routes/routerProducts")
const routerServices = require("./src/routes/routerServices")

mongoose
  .connect(process.env.MONGOO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json())
  app.use(errorHandler);
  app.use("/v2/users", routerUsers)
  app.use("/v2/products", routerPreducts)
  app.use("/v2/services", routerServices)

  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });