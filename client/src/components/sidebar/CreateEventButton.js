import React from 'react';

const CreateEventButton = () => {
  return (
    <div className='border p-2 rounded-full flex cursor-pointer items-center shadow-md hover:shadow-2xl'>
      <span className='material-icons-outlined  text-gray-600 mx-2'>add</span>
      <span>Create Event</span>
    </div>
  );
};

export default CreateEventButton;
