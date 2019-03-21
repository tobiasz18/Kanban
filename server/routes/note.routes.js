import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router({mergeParams: true});

router.route('/notes').post(NoteController.addNote);
router.route('/notes/:id').put(NoteController.updateNote);
router.route('/notes/:id').delete(NoteController.deleteNote);

export default router;
