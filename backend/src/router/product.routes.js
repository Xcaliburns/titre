const express = require("express");

const { getAll, getOne, createOne ,editOne, eraseOne} = require("../controller/product.controller.js");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createOne);
router.put("/:id",editOne)
router.delete('/:id', eraseOne);
module.exports = router;