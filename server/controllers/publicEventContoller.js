import PublicEvent from '../models/PublicEvent.model.js';

// POST /api/publicEvents
export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newEvent = new PublicEvent({
      title: title,
      description: description,
      date: date,
    });

    newEvent
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Event created successfully!',
          event: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the event: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createEvent: ' + error,
    });
  }
};

// GET /api/publicEvents
export const getEvents = async (req, res) => {
  const { date } = req.query;

  try {
    PublicEvent.find({ date: date }, (err, events) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the events: ' + err,
        });
      }

      if (!events) {
        return res.status(404).send({
          error: 'No events found',
        });
      }

      return res.status(200).send(events);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while fetching the events: ' + error,
    });
  }
};

// GET /api/publicEvents/:id
export const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    PublicEvent.findOne({ _id: id }, (err, event) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the event: ' + err,
        });
      }

      if (!event) {
        return res.status(404).send({
          error: 'No event found',
        });
      }

      return res.status(200).send(event);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while fetching the event: ' + error,
    });
  }
};