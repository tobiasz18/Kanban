import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: { type: 'String', required: true },
  editing: { type: Boolean },
  id: { type: 'String', required: true, unique: true }
}, {
  usePushEach: true
});

export default mongoose.model('Note', noteSchema);
