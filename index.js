const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env vars first
dotenv.config();
connectDB();

const app = express();

// Middleware (Add cookieParser)
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Update CORS for JWT cookies

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express! Api is running...");
});

// Import and use route files
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const openaiRoutes = require("./routes/openaiRoutes"); // New OpenAI routes


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/openai", openaiRoutes); // Mount OpenAI routes under /api/openai


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
