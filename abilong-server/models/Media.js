const mongoose = require('mongoose');

// One uploaded file per portfolio slot: an image (e.g. "healthcast-web")
// or a PDF document ("document-cv", "document-transcript").
const mediaSchema = new mongoose.Schema(
  {
    slot:     { type: String, required: true, unique: true },
    url:      { type: String, required: true },
    publicId: { type: String, required: true },
    width:    { type: Number },
    height:   { type: Number },
    bytes:    { type: Number },
    fileName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', mediaSchema);
