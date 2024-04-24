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
  categories: [],
  setCategories: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  allUsers: [],
  setAllUsers: () => {},
});

export default GlobalContext;