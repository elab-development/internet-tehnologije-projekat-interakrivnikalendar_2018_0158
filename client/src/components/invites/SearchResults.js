import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import avatar from '../../assets/usercalendar.png';
import { useFetch } from '../../hooks/fetch.hook';
import { createInvite } from '../../api/inviteRequests';
import Loader from '../Loader';
import GlobalContext from '../../context/GlobalContext';

const SearchResults = ({ results, setShowInviteModal }) => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const { selectedEvent } = useContext(GlobalContext);

  const handleInvite = async (user) => {
    let inviteData = {
      from: apiData._id,
      to: user._id,
      event: selectedEvent._id,
      answer: 'notanswered',
      toMail: user.email,
      toUsername: user.username,
      fromUsername: apiData.username,
    };

    let createPromise = createInvite(inviteData);

    toast.promise(createPromise, {
      loading: 'Sending an Invite...',
      success: <b>Invite sent Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    createPromise
      .then(() => {
        setShowInviteModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (serverError) return <h2>{serverError}</h2>;


  return (
    <div className='w-full flex flex-col shadow-lg rounded-lg mt-4 max-h[300px] overflow-y-scroll px-3 scrollbar scrollbar-thumb-white scrollbar-track-gray-200'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {results.map((result, idx) => (
        <div
          key={idx}
          className='cursor-pointer rounded-lg flex items-center px-1 mb-1 hover:bg-gray-700 hover:text-white'
          onClick={() => handleInvite(result)}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <img
                className='w-10 h-10 rounded'
                src={result.profile || avatar}
                alt={result.username}
              />
              <p className='text-lg mt-1  py-2 px-1 rounded-lg'>
                {result.username}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;