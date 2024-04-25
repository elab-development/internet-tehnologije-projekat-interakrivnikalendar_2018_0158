import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { updateInvite } from '../../api/inviteRequests';

const SentTableAnswer = ({ row }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {row.answer === 'notanswered' && (
        <p className='text-gray-400'>Waiting...</p>
      )}
      {row.answer === 'yes' && <p className='text-green-500'>Confirmed.</p>}
      {row.answer === 'no' && <p className='text-red-500'>Rejected.</p>}
    </>
  );
};

export default SentTableAnswer;