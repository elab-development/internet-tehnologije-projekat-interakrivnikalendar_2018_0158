import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Invite
export const createInvite = async (inviteData) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post('/api/invites', inviteData);

    let { toMail, toUsername, fromUsername } = inviteData;
    if (status === 201) {
      await axios.post('/api/auth/registerMail', {
        username: toUsername,
        userEmail: toMail,
        text: `You received an invitation from ${fromUsername}! Check it inside of your Interactive Calendar and send the response as soon as possible.`,
      });
    }

    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Invites
export const getInvites = async (query) => {
  const { id, type } = query;

  try {
    const { data, status } = await axios.get(
      `/api/invites?id=${id}&type=${type}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Get Invites Populated
export const getInvitesPopulated = async (query) => {
  const { id, type } = query;

  try {
    const { data, status } = await axios.get(
      `/api/invites/populated?id=${id}&type=${type}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};


// Get Invite
export const getInvite = async (id) => {
  try {
    const { data, status } = await axios.get(`/api/invites/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

// Update Invite
export const updateInvite = async (id, inviteData) => {
  try {
    const data = await axios.put(`/api/invites/${id}`, inviteData);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not update the invite.' });
  }
};

// Delete Invite
export const deleteInvite = async (id) => {
  try {
    const data = await axios.delete(`/api/invites/${id}`);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not delete the invite.' });
  }
};