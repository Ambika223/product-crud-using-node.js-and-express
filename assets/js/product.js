const cl = console.log;


const express = require('express');
const cors = require("cors");
const routes = require("./routes/productRoutes")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/product", routes)



module.exports = app;