import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../../styles/Username.module.css';
import avatar from '../../assets/usercalendar.png';
import { passwordValidate } from '../../utils/validate';
import { useFetch } from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store';
import Loader from '../loader';


const Password = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(
    `auth/user/${username}`
  );

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  if (serverError)
    return <h1 className='text-3xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>
              Hello, {apiData?.firstName || apiData?.username || username}!
            </h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter your password to begin.
            </span>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                  <img
                    src={apiData?.profile || avatar}
                    alt='avatar'
                    className={styles.profile_img}
                  />
                </div>

                <div className='textbox flex flex-col items-center gap-6'>
                  <input
                    type='password'
                    placeholder='Password'
                    {...formik.getFieldProps('password')}
                    className={styles.textbox}
                  />
                  <button type='submit' className={styles.btn}>
                    Sign In!
                  </button>
                </div>

                <div className='text-center py-4'>
                  <span className='text-gray-500'>
                    Forgot Password?{' '}
                    <Link to='/recovery' className='text-red-500'>
                      Recover Now
                    </Link>
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;