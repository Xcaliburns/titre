const express = require("express");

const productRoutes = require("./product.routes");
const movieRoutes = require("./movie.routes.js");
const userRoutes = require ("./user.routes.js")
const cartRoutes=require("./cart.routes");
const authRoutes = require("./auth.routes.js");
const cartproductRoutes=require("./cartproduct.routes");
const authorization = require("../middleware/auth.js");

const router = express.Router();

 // les midleware placé dans ce fichier seront global pour toutes les routes/*
router.use("/product",productRoutes);
router.use("/movie",authorization, movieRoutes);// toutes les route movies sont du coup soumise a authorization
router.use("/user",userRoutes);
router.use("/cart",authorization,cartRoutes)
router.use("/cartproduct",authorization,cartproductRoutes)
router.use(authRoutes);

module.exports = router;