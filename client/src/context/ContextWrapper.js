import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import GlobalContext from './GlobalContext';
import { getCategories } from '../api/categoryRequests';
import { getUsers } from '../api/authRequests';

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesPromise = getCategories();

      categoriesPromise
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchUsers = async () => {
      const usersPromises = getUsers();

      usersPromises
        .then((users) => {
          setAllUsers(users.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        categories,
        setCategories,
        selectedEvent,
        setSelectedEvent,
        allUsers,
        setAllUsers,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;