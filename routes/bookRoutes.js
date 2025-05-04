const express = require("express");
const router = express.Router();
const {
  insertBook,
  deleteBook,
  getBooksByGenre,
  searchBooks,
  getBookById,
  getFavorites,
  toggleFavorite,
} = require("../controllers/bookController");
const { model } = require("mongoose");

router.get("/", getBooksByGenre);
router.get("/favorites", getFavorites);
router.get("/:id", getBookById);
router.post("/", insertBook);
router.delete("/:title", deleteBook);
router.get("/search", searchBooks);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;
