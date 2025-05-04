const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    publication_year: {
      type: Number,
      required: [true, "Publication year is required"],
      trim: true,
    },
    cover_image_url: {
      type: String,
      required: [true, "Cover image url is required"],
      trim: true,
    },
    no_of_sections: {
      type: Number,
      required: [true, "Number of sections is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genres is required"],
      trim: true,
    },
    summary_section_1: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    summary_section_2: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    summary_section_3: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    summary_section_4: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    summary_section_5: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    favorites: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

BookSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Book", BookSchema);
