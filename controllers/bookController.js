const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch {
    res.status(500).json({ error: err.message });
  }
};

exports.insertBook = async (req, res) => {
  try {
    const { title, author, publication_year, cover_image_url, no_of_sections } =
      req.body;

    // Check if user exists
    const bookExists = await Book.findOne({ title });
    if (bookExists) {
      return res.status(400).json({ error: "Book already exists" });
    }

    // Create user with temporary password
    const book = await Book.create({
      title,
      author,
      publication_year,
      cover_image_url,
      no_of_sections,
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user (admin-only)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete(req.params.title);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
