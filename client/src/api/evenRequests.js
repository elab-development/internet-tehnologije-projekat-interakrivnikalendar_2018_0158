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