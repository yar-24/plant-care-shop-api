const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')
require("dotenv").config();
const { errorHandler } = require("./src/middleware/errorMiddleware");

const routerUsers = require("./src/routes/routerUsers")
const routerPreducts = require("./src/routes/routerProducts")
const routerServices = require("./src/routes/routerServices")
const routerCarts = require('./src/routes/routerCart')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API Pjocet plant care & shop',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://plant-care-shop-api.herokuapp.com/'
      }
    ]
  },
  apis: ['./src/middleware/swagger.js']
}

const swaggerSpec = swaggerJSDoc(options)

mongoose
  .connect(process.env.MONGOO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });



  app.use(cors());
  app.use(express.json());
  app.use(errorHandler);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use(bodyParser.json())
  app.use("/v2/users", routerUsers)
  app.use("/v2/products", routerPreducts)
  app.use("/v2/services", routerServices)
  app.use("/v2/carts", routerCarts)

  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });

  
