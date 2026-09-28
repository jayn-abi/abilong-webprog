const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

connectDB().catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://abilong-client.vercel.app",
    "https://abilong-client-git-production-jhyne-s-projects.vercel.app",
    "https://abilong-client-f60w99uiw-jhyne-s-projects.vercel.app",
    "https://abilong-client-ft5md0mdj-jhyne-s-projects.vercel.app",
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;