import express from 'express';
import { getNotes, updateNotes, createNotes, deleteNotes } from '../controllers/notesControllers.js';

const router = express.Router();

router.get('/', getNotes);

router.post('/', createNotes);

router.put('/:id', updateNotes);

router.delete('/:id', deleteNotes);

export default router;