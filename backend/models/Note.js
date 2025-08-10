const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  datetime: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
