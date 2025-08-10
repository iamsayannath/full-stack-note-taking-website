const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// GET all notes for logged in user, optional search by title
router.get('/', auth, async (req, res) => {
  try {
    const { q } = req.query; // search
    const filter = { user: req.user._id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    const notes = await Note.find(filter).sort({ datetime: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single note by id (must belong to user)
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: 'Title and body required' });
    const note = new Note({ user: req.user._id, title, body, datetime: new Date() });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const { title, body } = req.body;
    note.title = title ?? note.title;
    note.body = body ?? note.body;
    note.datetime = new Date();
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await note.remove();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
