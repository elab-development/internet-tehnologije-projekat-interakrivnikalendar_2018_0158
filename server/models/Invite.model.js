import mongoose from 'mongoose';

const InviteSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  rsvp: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: String,
    default: 'notanswered',
  },
});

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;