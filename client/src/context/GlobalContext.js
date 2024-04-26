import React from 'react';

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  showPublicEventModal: false,
  setShowPublicEventModal: () => {},
  showCategoriesModal: false,
  setShowCategoriesModal: () => {},
  categories: [],
  setCategories: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  allUsers: [],
  setAllUsers: () => {},
  loggedInUserData: null,
  setLoggedInUserData: () => {},
});

export default GlobalContext;