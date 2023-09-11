const express = require("express");

const { getAll, getOne, createOne ,editOne, eraseOne} = require("../controller/comment.controller.js");
const authorizationComment = require("../middleware/authComment.js");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/",authorizationComment, createOne);
router.put("/:id",authorizationComment,editOne)
router.delete('/:id',authorizationComment, eraseOne);
module.exports = router;