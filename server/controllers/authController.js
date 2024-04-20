import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/* ####################################
            BASIC USER ROUTES
#################################### */

// POST /api/auth/register
export const register = async (req, res) => {
    try {
      const { username, password, profile, email } = req.body;

      // Check if user exists
      const usernameExists = new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) reject(new Error(err));
          if (user) reject({ error: 'User with this username already exists.' });
          resolve();
        });
      });

      const emailExists = new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) reject(new Error(err));
          if (user) reject({ error: 'User with this email already exists.' });
          resolve();
        });
      });

      // Hashing Password & Creating new user
      Promise.all([usernameExists, emailExists])
        .then(() => {
          if (password) {
            bcrypt
              .hash(password, 10)
              .then((hashedPassword) => {
                const newUser = new User({
                  username: username,
                  password: hashedPassword,
                  profile: profile || '',
                  email: email,
                });

                newUser
                  .save()
                  .then((result) =>
                    res.status(201).send({
                      message: 'User registered successfully!',
                      user: result,
                    })
                  )
                  .catch((error) => {
                    res.status(500).send({
                      error:
                        'Something went wrong while creating the user: ' + error,
                    });
                  });
              })
              .catch((error) => {
                return res.status(500).send({
                  error: 'Password hashing went wrong: ' + error,
                });
              });
          }
        })
        .catch((error) => {
          return res.status(500).send({ error: 'User already exists: ' + error });
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Something went wrong while registering the user: ' + error,
      });
    }
  };
  
  // POST /api/auth/login
  export const login = async (req, res) => {
      const { username, password } = req.body;

    try {
      User.findOne({ username: username })
        .then((user) => {
          // Comparing Passwords
          bcrypt
            .compare(password, user.password)
            .then((passwordCheck) => {
              if (!passwordCheck) {
                return res.status(400).send({
                  error: 'Password does not match',
                });
              }

              // Creating JWT
              const token = jwt.sign(
                {
                  userId: user._id,
                  username: user.username,
                },
                ENV.JWT_SECRET,
                {
                  expiresIn: '24h',
                }
              );

              return res.status(200).send({
                message: `${user.username} logged in successfully!`,
                token: token,
              });
            })
            .catch((error) => {
              return res.status(400).send({
                error: 'Password does not match: ' + error,
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({
            error: 'User not found: ' + error,
          });
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Something went wrong while logging in the user: ' + error,
      });
    }
  };
  
  // GET /api/auth/user/:username
  export const getUser = async (req, res) => {
    const { username } = req.params;

    try {
      if (!username) {
        return res.status(501).send({
          error: 'Invalid username',
        });
      }

      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return res.status(500).send({
            error: 'Something went wrong while fetching the user: ' + err,
          });
        }

        if (!user) {
          return res.status(501).send({
            error: 'Could not find the user',
          });
        }

        const { password, ...rest } = user;

        return res.status(200).send({
          user: rest._doc,
        });
      });
    } catch (error) {
      return res.status(404).send({
        error: 'User not found: ' + error,
      });
    }
  };
  
  // PUT /api/auth/updateUser
  export const updateUser = async (req, res) => {
    res.json('Update User');
  };
  
  /* ####################################
          RESET PASSWORD ROUTES
  #################################### */
  
  // GET /api/auth/generateOTP
  export const generateOTP = async (req, res) => {
    res.json('Generate OTP');
  };
  
  // GET /api/auth/verifyOTP
  export const verifyOTP = async (req, res) => {
    res.json('Verify OTP');
  };
  
  // GET /api/auth/createResetSession
  export const createResetSession = async (req, res) => {
    res.json('Create Reset Session');
  };
  
  // PUT /api/auth/createResetSession
  export const resetPassword = async (req, res) => {
    res.json('Reset Password');
  };