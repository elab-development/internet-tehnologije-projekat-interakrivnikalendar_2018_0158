import React, { useContext } from 'react';

import CreateEventButton from './sidebar/CreateEventButton';
import CreatePublicEvent from './sidebar/CreatePublicEvent';
import SmallCalendar from './sidebar/SmallCalendar';
import ViewMenu from './sidebar/ViewMenu';
import GlobalContext from '../context/GlobalContext';

const Sidebar = ({ setView, view }) => {
  const { loggedInUserData } = useContext(GlobalContext);

  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      {loggedInUserData?.role === 'planner' && <CreatePublicEvent />}
      <SmallCalendar />
      <ViewMenu setView={setView} view={view} />
    </aside>
  );
};

export default Sidebar;