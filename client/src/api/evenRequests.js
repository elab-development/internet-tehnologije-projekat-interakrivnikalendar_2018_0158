import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Event
export const createEvent = async (eventData) => {
  try {
    const {
      data: { message },
    } = await axios.post('/api/events', eventData);

    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Events
export const getEvents = async (query) => {
  const { creator, date } = query;

  try {
    const { data, status } = await axios.get(
      `/api/events?creator=${creator}&date=${date}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Event
export const getEvent = async (id) => {
  try {
    const { data, status } = await axios.get(`/api/events/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Update Event
export const updateEvent = async (id, updateData) => {
  try {
    const data = await axios.put(`/api/events/${id}`, updateData);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not update the event.' });
  }
};

// Delete Event
export const deleteEvent = async (id) => {
  try {
    const data = await axios.delete(`/api/events/${id}`);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not delete the event.' });
  }
};