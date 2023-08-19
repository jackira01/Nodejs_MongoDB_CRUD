const { Router } = require('express');
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNotes,
  deleteNotes,
} = require('../controllers/notes.controller');
const { isAuthenticated } = require('../helpers/auth');

//Get All Notes
router.get('/notes', isAuthenticated, renderNotes);

//New Note
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, createNewNote);

//Edit Notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, updateNotes);

//Delete Note
router.delete('/notes/delete/:id', isAuthenticated, deleteNotes);

module.exports = router;
