import React, { useContext, useEffect, useState } from 'react';

import { getMonth } from '../utils/calendarUtils';
import GlobalContext from '../context/GlobalContext';
import CalendarHeader from '../components/CalendarHeader';
import Sidebar from '../components/Sidebar';
import Month from '../components/Month';
import Invites from '../components/Invites';
import EventModal from '../components/events/EventModal';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [view, setView] = useState('month');
  
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className='h-screen flex flex-col bg-stone-50'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar setView={setView} view={view} />
          {view === 'month' && <Month month={currentMonth} />}
          {view === 'myinvites' && <Invites type={'my'} />}
          {view === 'sentinvites' && <Invites type={'sent'} />}
        </div>
      </div>
      {showEventModal && <EventModal />}
    </>
  );
};

export default Calendar;