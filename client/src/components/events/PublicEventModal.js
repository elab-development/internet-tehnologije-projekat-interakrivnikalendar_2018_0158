import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import GlobalContext from '../../context/GlobalContext';
import { createPublicEvent } from '../../api/publicEventRequests';

const PublicEventModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { setShowPublicEventModal, daySelected } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var date = new Date(daySelected);

    let eventData = {
      title: title,
      description: description,
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
      }),
    };

    let createPromise = createPublicEvent(eventData);

    toast.promise(createPromise, {
      loading: 'Creating Event...',
      success: <b>Created Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    createPromise
      .then(() => {
        setTimeout(() => {
          setShowPublicEventModal(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='bg-black/50 h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <form
        className='bg-white rounded-lg shadow-2xl w-1/2'
        onSubmit={handleSubmit}
      >
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='material-icons-outlined text-gray-500'>
            drag_handle
          </span>
          <button
            type='button'
            onClick={() => {
              setShowPublicEventModal(false);
            }}
          >
            <span className='material-icons-outlined text-red-500'>close</span>
          </button>
        </header>
        <div className='p-3'>
          <div className='grid grid-cols-1/5 items-end gap-y-7'>
            <div></div>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='pt-3 border-0 text-gray-600 font-semibold text-lg pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-600'
            />
            <span className='material-icons-outlined text-gray-400 ml-10'>
              schedule
            </span>
            <p className='text-gray-500'>{daySelected.format(' MMMM DD')}</p>
            <span className='material-icons-outlined text-gray-400 mb-2 ml-10'>
              segment
            </span>
            <input
              type='text'
              name='description'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='pt-3 border-0 text-gray-600 text-md pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-600'
            />
          </div>
        </div>
        <footer className='flex justify-end w-100 border-t p-3 mt-5'>
          <button
            type='submit'
            className='bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-200'
          >
            Create
          </button>
        </footer>
      </form>
    </div>
  );
};

export default PublicEventModal;