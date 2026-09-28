const mongoose = require('mongoose');

// One uploaded image per portfolio slot (e.g. "healthcast-web").
const mediaSchema = new mongoose.Schema(
  {
    slot:     { type: String, required: true, unique: true },
    url:      { type: String, required: true },
    publicId: { type: String, required: true },
    width:    { type: Number },
    height:   { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', mediaSchema);
