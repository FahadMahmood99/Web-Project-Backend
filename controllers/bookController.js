const Book = require("../models/Book");

// In bookController.js
exports.getBooksByGenre = async (req, res) => {
  try {
    const genre = req.query.genre;

    // If genre is provided, filter books by genre
    const filter = genre ? { genre } : {}; // If genre is passed, filter; otherwise fetch all books

    const books = await Book.find(filter); // genre will come from URL like http://localhost:5000/api/books?genre=Fiction
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.insertBook = async (req, res) => {
  try {
    const { title, author, publication_year, cover_image_url, no_of_sections, genre } =
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
      genre
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

exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive regex
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    }).limit(10); // Optional: limit number of results

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Updated toggleFavorite function
exports.toggleFavorite = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    book.favorite = !book.favorite;
    const updatedBook = await book.save();
    
    res.status(200).json({
      message: "Favorite status updated successfully",
      book: updatedBook,
      isFavorite: updatedBook.favorite
    });
  } catch (err) {
    console.error("Error in toggleFavorite:", err);
    res.status(500).json({
      error: "Failed to update favorite status",
      details: err.message
    });
  }
};


// Updated getFavorites function
exports.getFavorites = async (req, res) => {
  try {
    console.log("Attempting to fetch favorite books...");
    const favorites = await Book.find({ favorite: true });
    
    if (!favorites || favorites.length === 0) {
      console.log("No favorite books found");
      return res.status(200).json([]); // Return empty array instead of error
    }
    
    console.log(`Found ${favorites.length} favorite books`);
    res.status(200).json(favorites);
  } catch (err) {
    console.error("Error in getFavorites:", err);
    res.status(500).json({ 
      error: "Failed to fetch favorites",
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};