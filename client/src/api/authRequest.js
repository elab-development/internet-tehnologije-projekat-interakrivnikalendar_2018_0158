import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Authenticate
export const authenticate = async (username) => {
  try {
    return await axios.post('/api/auth/authenticate', {
      username,
    });
  } catch (error) {
    return { error: 'Username does not exist!' };
  }
};

// Get User Details
export const getUser = async ({ username }) => {
  try {
    await axios.get(`/api/auth/user/${username}`);
  } catch (error) {
    return { error: 'Password does not match!' };
  }
};

// Register User
export const registerUser = async (credentials) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post('/api/auth/register', credentials);

    let { username, email } = credentials;
    if (status === 201) {
      await axios.post('/api/auth/registerMail', {
        username: username,
        userEmail: email,
        text: message,
      });
    }

    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Login User
export const loginUser = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post('/api/auth/login', {
        username: username,
        password: password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Update User
export const updateUser = async (response) => {
  try {
    const token = localStorage.getItem('token');
    const data = await axios.put(`/api/auth/updateUser`, response, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not update the user.' });
  }
};