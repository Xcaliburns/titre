const express = require("express");

const { getAll,  createOne ,getOne} = require("../controller/cartproduct.controller.js");

const router = express.Router();

router.get("/", getAll);
router.get("/:id",getOne)
router.post("/", createOne);

module.exports = router;