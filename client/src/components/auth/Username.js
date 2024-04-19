import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../../styles/Username.module.css';
import avatar from '../../assets/usercalendar.png';
import { usernameValidate } from '../../utils/validate';

const Username = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
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
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Welcome Back!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Organize your Life Better.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} alt='avatar' className={styles.profile_img} />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='text'
                placeholder='Username'
                {...formik.getFieldProps('username')}
                className={styles.textbox}
              />
              <button type='submit' className={styles.btn}>
                Let's Go!
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Haven't signed up yet?{' '}
                <Link to='/register' className='text-red-500'>
                  Register Now!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;