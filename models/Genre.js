const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically generate `id` (alternative to `_id`)
GenreSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
GenreSchema.set("toJSON", { virtuals: true });

mongoose.model = mongoose.model("Genre", GenreSchema);
