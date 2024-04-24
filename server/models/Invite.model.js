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
    required: true,
  },
});

const Invite = mongoose.model('Invite', InviteSchema);
export default Invite;