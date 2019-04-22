import Lane from '../models/lane';
import uuid from 'uuid/v4';
import Note from '../models/note'

function randomColor() {
  const colors = ['#F98C00', '#363D9C', '#2D7D31', '#2395F3','rgb(233, 20, 117)', 'rgb(18, 166, 254)', 'rgb(236, 83, 105)']
  const ramdoColor = colors[Math.floor(Math.random() * 8)] 
  return ramdoColor
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }   
 
  const newLane = new Lane(req.body);


  newLane.id = uuid();
  newLane.editing = false;
  newLane.color = randomColor();

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

    Lane.findOne({id: req.params.id}).exec()
      .then(lane => res.json({lane}))

  } catch (err) {
    res.status(500).send(err)
  }
}


