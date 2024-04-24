import Event from '../models/Event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, creator, location, category, date } = req.body;

    const newEvent = new Event({
      title: title,
      description: description,
      creator: creator,
      location: location,
      category: category,
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

export const getEvents = async (req, res) => {
  const { creator, date } = req.query;

  try {
    Event.find({ creator: creator, date: date }, (err, events) => {
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