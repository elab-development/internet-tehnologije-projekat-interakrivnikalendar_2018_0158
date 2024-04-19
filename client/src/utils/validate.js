import toast from 'react-hot-toast';

export const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values);
  return errors;
};

export const passwordValidate = async (values) => {
  const errors = passwordVerify({}, values);
  return errors;
};

export const resetPasswordValidate = async (values) => {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Passwords do not match!');
  }

  return errors;
};

const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username is Required!');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username!');
  } else if (values.username.length < 6) {
    error.username = toast.error(
      'Username must be at least 6 characters long!'
    );
  }
  return error;
};

const passwordVerify = (error = {}, values) => {
  const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (!values.password) {
    error.password = toast.error('Password is Required!');
  } else if (values.password.length < 6) {
    error.password = toast.error(
      'Password must be at least 6 characters long!'
    );
  } else if (!specialCharacters.test(values.password)) {
    error.password = toast.error(
      'Password must have at least one special character!'
    );
  }

  return error;
};