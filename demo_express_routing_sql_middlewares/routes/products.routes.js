const productsController = require('../controllers/products.controller');
const router = require('express').Router();

//http://localhost:3000/api/products/1
//http://localhost:3000/api/products

router.get("/:id?", productsController.getProduct);

module.exports = router;