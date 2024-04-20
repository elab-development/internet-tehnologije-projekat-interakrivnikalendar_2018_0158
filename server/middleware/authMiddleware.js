import User from '../models/User.model.js';

export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    // Check if user exists
    let userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(404).send({
        error: 'Cannot find the user!',
      });
    }

    next();
  } catch (error) {
    return res.status(404).send({
      error: 'Authentication failed: ' + error,
    });
  }
};