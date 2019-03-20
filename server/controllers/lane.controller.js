import Lane from '../models/lane';
import uuid from 'uuid/v4';
import Note from '../models/note'

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }   

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lane: saved });
  })
}

export function getLanes(req, res) {
  try {
    Lane.find({}).exec().then(lanes => res.json({lanes}));
  } catch (err) {
    res.status(500).send(err);  
  }
}

export function deleteLane(req, res) {
  try { // find and delete chosen notes from data base which are related with lane to deleted
    Lane.findOne({id: req.params.id}).exec().then(lanes => {
      lanes.notes.forEach(note => { 
        Note.findOne({_id: note}).exec().then(note => note.remove())
      });
    });
    // delete selected lane with pushed notes but not notes with db
    Lane.deleteOne({id: req.params.id})
    .then(laneDeleted => {
      res.json(laneDeleted)
    })

  } catch (err) {
    res.status(500).send(err)
  }
}

export function updateLane(req, res) {
  try {
    Lane.updateOne({id: req.params.id}, req.body).exec()
      .then(updateLane => res.json(updateLane))
  } catch (err) {
    res.status(500).send(err)
  }
}