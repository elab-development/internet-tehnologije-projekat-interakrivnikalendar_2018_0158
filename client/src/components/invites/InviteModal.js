import React, { useState } from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const InviteModal = ({ setShowInviteModal }) => {
  const [results, setResults] = useState([]);

  return (
    <div className='bg-black/50 h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-2xl w-1/3'>
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='material-icons-outlined text-gray-500'>
            drag_handle
          </span>
          <button
            type='button'
            onClick={() => {
              setShowInviteModal(false);
            }}
          >
            <span className='material-icons-outlined text-red-500'>close</span>
          </button>
        </header>
        <div className='w-full'>
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </div>
    </div>
  );
};

export default InviteModal;