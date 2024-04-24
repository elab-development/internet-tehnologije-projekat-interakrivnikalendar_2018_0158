import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import GlobalContext from '../context/GlobalContext';
import { getEvents } from '../api/eventRequests';
import { useFetch } from '../hooks/fetch.hook';
import Loader from './Loader';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-indigo-600 text-white rounded-full w-7'
      : '';
  };

  const { setDaySelected, setShowEventModal } = useContext(GlobalContext);
  
  const [{ isLoading, apiData, serverError }] = useFetch();

  useEffect(() => {
    var date = new Date(day);
    const eventsPromise = getEvents({
      creator: apiData?._id,
      date: date.toLocaleDateString(),
    });

    eventsPromise.then((data) => {
      setDayEvents(data);
    });
  }, [apiData]);

  if (serverError) return <h2>{serverError}</h2>;

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        className='flex-1 cursor-pointer'
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
        >
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {dayEvents.map((dayEvent, i) => (
              <>
                <div key={i}>{dayEvent.title}</div>
                <div key={i}>{dayEvent.description}</div>
                <div key={i}>{dayEvent.category}</div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;