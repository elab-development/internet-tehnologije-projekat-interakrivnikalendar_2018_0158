import React from 'react';

import CreateEventButton from './sidebar/CreateEventButton';
import SmallCalendar from './sidebar/SmallCalendar';
import ViewMenu from './sidebar/ViewMenu';

const Sidebar = ({ setView, view }) => {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      <SmallCalendar />
      <ViewMenu setView={setView} view={view} />
    </aside>
  );
};

export default Sidebar;