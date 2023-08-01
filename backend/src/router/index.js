const express = require("express");

const productRoutes = require("./product.routes");

const userRoutes = require ("./user.routes.js")

const authRoutes = require("./auth.routes.js");

const commentRoutes=require("./comment.routes");
const authorization = require("../middleware/auth.js");

const router = express.Router();

 // les midlewares placés dans ce fichier seront global pour toutes les routes/*
router.use("/product",productRoutes);
router.use("/user",userRoutes);
router.use("/comment",commentRoutes);
router.use(authRoutes);

module.exports = router;