const mongoose = require('mongoose');

/*
 * Editable portfolio content (a single document, key "main").
 * Each field mirrors a section of the public site. Any field that has never
 * been saved is left unset, and the client falls back to its built-in default.
 */
const { Mixed } = mongoose.Schema.Types;

const portfolioSchema = new mongoose.Schema(
  {
    key:             { type: String, default: 'main', unique: true },
    profile:         { type: Mixed },
    links:           { type: Mixed },
    about:           { type: Mixed },
    contact:         { type: Mixed },
    featuredProject: { type: Mixed },
    projects:        { type: Array, default: undefined },
    skillGroups:     { type: Array, default: undefined },
    experience:      { type: Array, default: undefined },
    leadership:      { type: Array, default: undefined },
    education:       { type: Array, default: undefined },
    certifications:  { type: Array, default: undefined },
    learningAreas:   { type: Array, default: undefined },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
