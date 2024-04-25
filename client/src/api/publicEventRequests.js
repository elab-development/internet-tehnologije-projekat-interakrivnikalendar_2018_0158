import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Public Event
export const createPublicEvent = async (eventData) => {
  try {
    const {
      data: { message },
    } = await axios.post('/api/publicEvents', eventData);

    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Public Events
export const getPublicEvents = async (query) => {
  const { date } = query;

  try {
    const { data, status } = await axios.get(`/api/publicEvents?date=${date}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Event
export const getPublicEvent = async (id) => {
  try {
    const { data, status } = await axios.get(`/api/publicEvents/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};