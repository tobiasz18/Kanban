import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router({mergeParams: true});

router.route('/notes').post(NoteController.addNote);

export default router;
