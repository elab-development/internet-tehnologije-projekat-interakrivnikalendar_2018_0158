import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewMenu = ({ setView, view }) => {
  const navigate = useNavigate();

  return (
    <div className='mt-5'>
      <ul
        className='py-2 text-sm text-gray-500 font-bold'
        aria-labelledby='dropdownLargeButton'
      >
        <li
          onClick={() => setView('month')}
          className={`cursor-pointer block px-4 py-2 rounded hover:bg-gray-300 ${
            view === 'month' && 'bg-gray-200'
          }`}
        >
          Calendar
        </li>
        <li
          onClick={() => setView('myinvites')}
          className={`cursor-pointer block px-4 py-2 rounded hover:bg-gray-300 ${
            view === 'myinvites' && 'bg-gray-200'
          }`}
        >
          My Invites
        </li>
        <li
          onClick={() => setView('sentinvites')}
          className={`cursor-pointer block px-4 py-2 rounded hover:bg-gray-300 ${
            view === 'sentinvites' && 'bg-gray-200'
          }`}
        >
          Sent Invites
        </li>
        <li
          onClick={() => navigate('/profile')}
          className={`cursor-pointer block px-4 py-2 rounded hover:bg-gray-300 `}
        >
          Profile
        </li>
      </ul>
    </div>
  );
};

export default ViewMenu;