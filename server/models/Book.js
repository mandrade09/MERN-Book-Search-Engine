const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  description: String,
  image: String,
  link: String,
});

module.exports = mongoose.model('Book', bookSchema);

