require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_URI;
// const SALT = parseInt(process.env.SALT);
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || "development";

// Cloudinary (project / certificate images). The API secret stays server-side only.
// Accepts CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
// or the three separate variables.
let cloudinaryUrl = null;
try {
  if (process.env.CLOUDINARY_URL) cloudinaryUrl = new URL(process.env.CLOUDINARY_URL);
} catch {
  console.error("CLOUDINARY_URL is not a valid cloudinary:// URL");
}
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || cloudinaryUrl?.hostname;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || decodeURIComponent(cloudinaryUrl?.username || "");
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || decodeURIComponent(cloudinaryUrl?.password || "");

module.exports = {
  MONGO_DB_URL,
  PORT,
  SECRET_KEY,
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
