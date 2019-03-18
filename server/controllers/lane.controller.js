import Lane from '../models/lane';
import uuid from 'uuid/v4';

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

