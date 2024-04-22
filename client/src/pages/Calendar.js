import React, { useState } from 'react';

import { getMonth } from '../utils/calendarUtils';
import CalendarHeader from '../components/CalendarHeader';
import Sidebar from '../components/Sidebar';
import Month from '../components/Month';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <div className='h-screen flex flex-col bg-stone-50'>
      <CalendarHeader />
      <div className='flex flex-1'>
        <Sidebar />
        <Month month={currentMonth} />
      </div>
    </div>
  );
};

export default Calendar;