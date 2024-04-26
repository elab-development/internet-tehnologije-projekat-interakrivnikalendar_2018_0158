import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import GlobalContext from '../context/GlobalContext';
import { getEvents } from '../api/eventRequests';
import { getPublicEvents } from '../api/publicEventRequests';
import { useFetch } from '../hooks/fetch.hook';
import Loader from './Loader';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const [dayPublicEvents, setDayPublicEvents] = useState([]);
  const [dayPublicHolidays, setDayPublicHolidays] = useState([]);
  
  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-indigo-600 text-white rounded-full w-7'
      : '';
  };

  const {
    setDaySelected,
    setShowEventModal,
    categories,
    showEventModal,
    setSelectedEvent,
    publicHolidays,
  } = useContext(GlobalContext);
  
  const [{ isLoading, apiData, serverError }] = useFetch();

  useEffect(() => {
    var date = new Date(day);
    const eventsPromise = getEvents({
      creator: apiData?._id,
      date: date.toLocaleDateString(),
    });

    eventsPromise
      .then((data) => {
        setDayEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [apiData, day, showEventModal]);
    useEffect(() => {
      var date = new Date(day);
  
      const eventsPromise = getPublicEvents({
        date: date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'numeric',
        }),
      });
  
      eventsPromise
        .then((data) => {
          setDayPublicEvents(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [apiData, day]);

    useEffect(() => {
      const publicHolidaysForThisDay = publicHolidays.filter(
        (publicHoliday) =>
          day.format('DD-MM-YY') === dayjs(publicHoliday.date).format('DD-MM-YY')
      );
      setDayPublicHolidays(publicHolidaysForThisDay);
    }, [publicHolidays]);

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
      {dayPublicHolidays.map((publicHoliday, i) => (
        <div
          key={i}
          className='bg-gray-500 text-white rounded p-1 text-sm mb-1 truncate hover:bg-opacity-50'
        >
          {publicHoliday.name}
        </div>
      ))}
      {dayPublicEvents.map((publicEvent, i) => (
        <div
          key={i}
          className={`bg-green-500 text-white rounded p-1 text-sm mb-1 truncate hover:bg-opacity-50`}
        >
          {publicEvent.title}
        </div>
      ))}
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
              <div
              key={i}
              onClick={() => setSelectedEvent(dayEvent)}
              className={`${
                categories.filter(
                  (categ) => categ.name === dayEvent.category
                )[0].bgClass
              } text-white rounded p-1 text-sm mb-1 truncate hover:bg-opacity-50`}
            >
              <span className='material-icons-outlined text-sm mt-1 mx-1'>
                {
                  categories.filter(
                    (categ) => categ.name === dayEvent.category
                  )[0].iconTag
                }
              </span>
              {dayEvent.title}
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;