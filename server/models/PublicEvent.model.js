import mongoose from 'mongoose';

const PublicEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Provide the title'],
  },
  description: {
    type: String,
    required: [true, 'Provide the description'],
  },
  date: {
    type: String,
  },
});

const PublicEvent = mongoose.model('PublicEvent', PublicEventSchema);
export default PublicEvent;