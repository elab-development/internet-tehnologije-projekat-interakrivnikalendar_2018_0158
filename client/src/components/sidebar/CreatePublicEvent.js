import React, { useContext } from 'react';

import GlobalContext from '../../context/GlobalContext';

const CreatePublicEvent = () => {
  const { setShowPublicEventModal } = useContext(GlobalContext);

  return (
    <div
      onClick={() => setShowPublicEventModal(true)}
      className=' mt-2 p-2 rounded-full flex cursor-pointer items-center shadow-md hover:shadow-2xl bg-indigo-600 text-white'
    >
      <span className='material-icons-outlined  text-white mx-2'>add</span>
      <span>Public Event</span>
    </div>
  );
};

export default CreatePublicEvent;