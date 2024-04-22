import React from 'react';
import calendar from '../assets/googlecalendar.png';

const CalendarHeader = () => {
  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={calendar} alt='logo' className='mr-2 w-12 h-12' />
      <h1 className='mr-10 text-xl text-gray-700 font-bold'>
        Interactive Calendar
      </h1>
      <button className='border rounded text-gray-600 py-2 px-4 mr-5'>
        Today
      </button>
      <button>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_left
        </span>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_right
        </span>
      </button>
    </header>
  );
};

export default CalendarHeader;