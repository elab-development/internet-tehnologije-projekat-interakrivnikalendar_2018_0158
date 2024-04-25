import mongoose from 'mongoose';

const InviteSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  rsvp: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: String,
  },
});

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;