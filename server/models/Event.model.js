import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Provide the title'],
  },
  description: {
    type: String,
    required: [true, 'Provide the description'],
  },
  creator: {
    // userID
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  location: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;