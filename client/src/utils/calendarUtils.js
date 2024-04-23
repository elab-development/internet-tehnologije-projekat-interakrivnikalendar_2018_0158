import dayjs from 'dayjs';

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

export const categories = [
  { background: 'indigo', icon: 'celebration', category: 'party' },
  { background: 'red', icon: 'flight', category: 'travel' },
  { background: 'pink', icon: 'local_bar', category: 'nightout' },
  { background: 'indigo', icon: 'business_center', category: 'business' },
];