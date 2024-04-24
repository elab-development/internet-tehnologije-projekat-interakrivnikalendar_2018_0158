import React from 'react';
import avatar from '../../assets/usercalendar.png';

const SearchResults = ({ results }) => {
  return (
    <div className='w-full flex flex-col shadow-lg rounded-lg mt-4 max-h[300px] overflow-y-scroll px-3 scrollbar scrollbar-thumb-white scrollbar-track-gray-200'>
      {results.map((result, idx) => (
        <div
          key={idx}
          className='cursor-pointer flex items-center px-1 mb-1 hover:bg-gray-700 hover:text-white'
        >
          <img
            className='w-10 h-10'
            src={result.profile || avatar}
            alt={result.username}
          />
          <p className='text-lg mt-1  py-2 px-1 rounded-lg'>
            {result.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;