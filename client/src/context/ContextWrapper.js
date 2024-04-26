import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import GlobalContext from './GlobalContext';
import { getCategories } from '../api/categoryRequests';
import { getUsers } from '../api/authRequests';
import { getUsername } from '../utils/helpers';
import { getPublicHolidays } from '../utils/webServices';

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPublicEventModal, setShowPublicEventModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [publicHolidays, setPublicHolidays] = useState([]);

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

    const fetchLoggedInUser = async () => {
      const { username } = await getUsername();
      const { data } = await axios.get(`/api/auth/user/${username}`);
      setLoggedInUserData(data);
    };

    fetchCategories();
    fetchUsers();
    fetchLoggedInUser();
  }, []);

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

    fetchCategories();
  }, [showCategoriesModal]);

  useEffect(() => {
    const getHolidays = async () => {
      const res = await getPublicHolidays();
      setPublicHolidays(res);
    };

    getHolidays();
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
        showPublicEventModal,
        setShowPublicEventModal,
        showCategoriesModal,
        setShowCategoriesModal,
        categories,
        setCategories,
        selectedEvent,
        setSelectedEvent,
        allUsers,
        setAllUsers,
        loggedInUserData,
        setLoggedInUserData,
        publicHolidays,
        setPublicHolidays,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;