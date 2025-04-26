const mongoose = require("mongoose");

const BookGenre = new mongoose.Schema(
  {
    BookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      require: true,
    },
    GenreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically generate `id` (alternative to `_id`)
BookGenre.virtual("id").get(function () {
  return this._id.toHexString();
});
BookGenre.set("toJSON", { virtuals: true });

module.exports = mongoose.model("BookGenre", BookGenre);
