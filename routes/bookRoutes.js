const express = require("express");
const router = express.Router();
const {
  insertBook,
  deleteBook,
  getBooksByGenre,
  searchBooks,
} = require("../controllers/bookController");
const { model } = require("mongoose");

router.get("/search", searchBooks);
router.get("/", getBooksByGenre);
router.post("/", insertBook);
router.delete("/:title", deleteBook);

module.exports = router;
