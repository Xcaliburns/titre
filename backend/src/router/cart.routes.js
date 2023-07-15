const express = require("express");

const {  getOne,createOne, getAll } = require("../controller/cart.controller.js");

const router = express.Router();

router.get("/",getAll);
router.get("/:id", getOne);
router.post("/", createOne);

module.exports = router;