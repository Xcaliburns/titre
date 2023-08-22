const express = require("express");

const {
  getAll,
  getOne,
  createOne,
  editOne,
  eraseOne,
} = require("../controller/product.controller.js");

const authorization = require("../middleware/auth.js");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", authorization,createOne);
router.put("/:id",authorization, editOne);
router.delete("/:id", authorization,eraseOne);
module.exports = router;
