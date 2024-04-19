import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../../styles/Username.module.css';
import profileStyles from '../../styles/Profile.module.css';
import avatar from '../../assets/usercalendar.png';
import { profileValidate } from '../../utils/validate';
import { convertToBase64 } from '../../utils/convert';

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div
          className={`${styles.glass} ${profileStyles.glass}`}
          style={{ width: '45%', paddingTop: '3em' }}
        >
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile Settings</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Edit your Information
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img
                  src={file || avatar}
                  alt='avatar'
                  className={`${styles.profile_img} ${profileStyles.profile_img}`}
                />
              </label>
              <input
                type='file'
                id='profile'
                name='profile'
                onChange={onUpload}
              />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <div className='name flex w-3/4 gap-10'>
                <input
                  type='text'
                  placeholder='First Name'
                  {...formik.getFieldProps('firstName')}
                  className={`${styles.textbox} ${profileStyles.textbox}`}
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  {...formik.getFieldProps('lastName')}
                  className={`${styles.textbox} ${profileStyles.textbox}`}
                />
              </div>
              <input
                type='text'
                placeholder='Email'
                {...formik.getFieldProps('email')}
                className={`${styles.textbox} ${profileStyles.textbox}`}
              />
              <input
                type='text'
                placeholder='Username'
                {...formik.getFieldProps('username')}
                className={`${styles.textbox} ${profileStyles.textbox}`}
              />

              <button type='submit' className={styles.btn}>
                Update Details!
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                That's it for now?{' '}
                <Link to='/' className='text-red-500'>
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;