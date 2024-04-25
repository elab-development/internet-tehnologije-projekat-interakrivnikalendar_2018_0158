import Invite from '../models/Invite.model.js';
import { Types } from 'mongoose';

// POST /api/invites
export const createInvite = async (req, res) => {
  try {
    const { from, to, event } = req.body;

    const newInvite = new Invite({
      from: from,
      to: to,
      event: event,
    });

    newInvite
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Invite created successfully!',
          invite: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the invite: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createInvite: ' + error,
    });
  }
};

// GET /api/invites
export const getInvites = async (req, res) => {
  const { id, type } = req.query;

  try {
    if (type === 'my') {
      Invite.find({ to: Types.ObjectId(id) }, (err, invites) => {
        if (err) {
          return res.status(500).send({
            error: 'Something went wrong while fetching the invites: ' + err,
          });
        }

        if (!invites) {
          return res.status(404).send({
            error: 'No my invites found',
          });
        }

        return res.status(200).send(invites);
      });
    } else if (type === 'sent') {
      Invite.find({ from: Types.ObjectId(id) }, (err, invites) => {
        if (err) {
          return res.status(500).send({
            error: 'Something went wrong while fetching the invites: ' + err,
          });
        }

        if (!invites) {
          return res.status(404).send({
            error: 'No sent invites found',
          });
        }

        return res.status(200).send(invites);
      });
    } else {
      return res.status(500).send({
        error: 'Wrong type sent!',
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while fetching the invites: ' + error,
    });
  }
};

// GET /api/invites/populated
export const getSentInvitesPopulated = async (req, res) => {
  const { id, type } = req.query;

  try {
    if (type === 'my') {
      const invites = await Invite.find({ to: Types.ObjectId(id) })
        .populate('to')
        .populate('from')
        .populate('event')
        .exec();

      return res.status(200).send(invites);
    } else if (type === 'sent') {
      const invites = await Invite.find({ from: Types.ObjectId(id) })
        .populate('to')
        .populate('from')
        .populate('event')
        .exec();

      return res.status(200).send(invites);
    } else {
      return res.status(500).send({
        error: 'Wrong type sent!',
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while fetching the invites: ' + error,
    });
  }
};


// GET /api/invites/:id
export const getInvite = async (req, res) => {
  const { id } = req.params;

  try {
    Invite.findOne({ _id: id }, (err, invite) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the invite: ' + err,
        });
      }

      if (!invite) {
        return res.status(404).send({
          error: 'No invite found',
        });
      }

      return res.status(200).send(invite);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while fetching the invite: ' + error,
    });
  }
};

// PUT /api/invites/:id
export const updateInvite = async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;
    Invite.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Invite information updated',
        invite: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while updateInvite: ' + error,
    });
  }
};

// DELETE /api/invites/:id
export const deleteInvite = async (req, res) => {
  try {
    await Invite.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Invite deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while deleteInvite: ' + error,
    });
  }
};