import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../../styles/Username.module.css';
import { resetPasswordValidate } from '../../utils/validate';

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: '50%' }}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset your Password</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>

          <form className='pt-20' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='password'
                placeholder='New password'
                {...formik.getFieldProps('password')}
                className={styles.textbox}
              />
              <input
                type='password'
                placeholder='Confirm password'
                {...formik.getFieldProps('confirm_pwd')}
                className={styles.textbox}
              />
              <button type='submit' className={styles.btn}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;