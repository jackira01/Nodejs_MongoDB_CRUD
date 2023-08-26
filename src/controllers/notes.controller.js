const notesCtrl = {};
const Note = require('../models/Notes');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description, user: req.user._id });
  await newNote.save();
  req.flash('success_msg', 'Note added successfully');
  res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).lean();
  res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user._id) {
    req.flash('error_msg', 'Access Denied');
    res.redirect('/notes');
  }
  res.render('notes/edit-note', { note });
};

notesCtrl.updateNotes = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note updated successfully');
  res.redirect('/notes');
};

notesCtrl.deleteNotes = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully');
  res.redirect('/notes');
};

module.exports = notesCtrl;
