import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import GlobalContext from '../../context/GlobalContext';
import { createEvent, deleteEvent, updateEvent } from '../../api/eventRequests';
import { useFetch } from '../../hooks/fetch.hook';
import Loader from '../Loader';

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    categories,
    setSelectedEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent?.title || '');
  const [description, setDescription] = useState(
    selectedEvent?.description || ''
  );
  const [location, setLocation] = useState(selectedEvent?.location || '');
  const [selectedCategory, setSelectedCategory] = useState(
    selectedEvent?.category || 'business'
  );

  
  const [{ isLoading, apiData, serverError }] = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    var date = new Date(daySelected);

    let eventData = {
      title: title,
      description: description,
      creator: apiData._id,
      location: location,
      category: selectedCategory,
      date: date.toLocaleDateString(),
    };

    let createPromise = createEvent(eventData);

    toast.promise(createPromise, {
      loading: 'Creating Event...',
      success: <b>Created Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    createPromise
      .then(() => {
        setTimeout(() => {
          setShowEventModal(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    let eventData = {
      title: title,
      description: description,
      location: location,
      category: selectedCategory,
    };

    let updatePromise = updateEvent(selectedEvent._id, eventData);

    toast.promise(updatePromise, {
      loading: 'Updating Event...',
      success: <b>Updated Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    updatePromise
      .then(() => {
        setTimeout(() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    let deletePromise = deleteEvent(selectedEvent._id);

    toast.promise(deletePromise, {
      loading: 'Deleting Event...',
      success: <b>Deleted Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    deletePromise
      .then(() => {
        setTimeout(() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (serverError) return <h1>{serverError}</h1>;

  return (
    <div className='bg-black/50 h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {isLoading ? (
        <Loader />
      ) : (
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
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
            >
              <span className='material-icons-outlined text-red-500'>
                close
              </span>
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
              <p className='text-gray-500'>
                {daySelected.format('dddd, MMMM DD')}
              </p>
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
              <span className='material-icons-outlined text-gray-400 mb-2 ml-10'>
                location_on
              </span>
              <input
                type='text'
                name='location'
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='pt-3 border-0 text-gray-600 text-md pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-600'
              />
              <span className='material-icons-outlined text-gray-400 mb-2 ml-10'>
                category
              </span>
              <div className='flex gap-x-2 ml-3'>
                {categories.map((cat, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`${
                      selectedCategory === cat.name
                        ? cat.bgClass
                        : 'bg-gray-500'
                    }  w-6 h-6 rounded-full flex items-center justify-center cursor-pointer mb-2`}
                  >
                    <span className='material-icons-outlined text-white text-sm'>
                    {cat.iconTag}
                    </span>
                  </span>
                ))}
                </div>
            </div>
          </div>
          <footer className='flex justify-end w-100 border-t p-3 mt-5'>
          {selectedEvent ? (
              <>
                <button
                  onClick={handleUpdate}
                  type='button'
                  className='bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-200'
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  type='button'
                  className='bg-red-600 ml-2 px-4 py-2 rounded text-white hover:bg-red-200'
                >
                  <span className='material-icons-outlined mt-2'>delete</span>
                </button>
              </>
            ) : (
              <button
                type='submit'
                className='bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-200'
              >
                Create
              </button>
            )}
          </footer>
        </form>
      )}
    </div>
  );
};

export default EventModal;