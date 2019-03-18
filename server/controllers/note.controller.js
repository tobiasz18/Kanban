import Note from '../models/note';

export function addNote(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newNote = new Note(req.body)

  newNote.id = '1234'

  newNote.save().then((res) => res.json({ note: saved }));
}
