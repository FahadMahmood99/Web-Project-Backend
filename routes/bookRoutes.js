const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  insertBook,
  deleteBook,
} = require("../controllers/bookController");
const { model } = require("mongoose");

router.get("/", getAllBooks);
router.post("/", insertBook);
router.delete("/:title", deleteBook);

module.exports = router;
