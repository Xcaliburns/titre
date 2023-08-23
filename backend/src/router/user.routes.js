const express = require("express");

const { getOne, createOne,getAll } = require ("../controller/user.controller.js");

const router = express.Router();


router.get("/:id", getOne);
router.get("/", getAll);
router.post("/", createOne );

module.exports = router;
