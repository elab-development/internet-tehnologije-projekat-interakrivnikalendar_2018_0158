import React from 'react';

const SentTableAnswer = ({ row }) => {
  return (
    <>
      {row.answer === 'notanswered' && (
        <p className='text-gray-400'>Waiting...</p>
      )}
      {row.answer === 'yes' && <p className='text-green-500'>Confirmed.</p>}
      {row.answer === 'no' && <p className='text-red-500'>Rejected.</p>}
    </>
  );
};

export default SentTableAnswer;