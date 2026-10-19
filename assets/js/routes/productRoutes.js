const express = require('express');
const routes = express.Router();
const productController = require("../controllers/productController");

routes.get("/", productController.getProducts);
routes.get("/:id", productController.getSingleProduct);
routes.post("/", productController.createProducts);
routes.patch("/:id", productController.updateProducts);
routes.delete("/:id", productController.deleteProducts);

module.exports = routes;