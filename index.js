const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware (Add cookieParser)
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Update CORS for JWT cookies
app.use(express.json());
app.use(cookieParser()); // Add this line

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express! Api is running...");
});

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Add this line
const bookRoutes = require("./routes/bookRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Add this line
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
