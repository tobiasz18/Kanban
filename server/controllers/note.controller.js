import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid/v4';

export function addNote(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newNote = new Note(req.body)

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if(err) {
      res.status(500).send(err);
    }

    Lane.findOne({id: req.params.laneId})
    .then(lane => {
      lane.notes.push(saved)
      return lane.save()
    })
    .then(() => {
      res.json(saved)
    })
  })   
}


