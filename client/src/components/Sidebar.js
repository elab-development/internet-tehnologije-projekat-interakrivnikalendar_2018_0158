import React, { useContext } from 'react';

import CreateEventButton from './sidebar/CreateEventButton';
import CreatePublicEvent from './sidebar/CreatePublicEvent';
import SmallCalendar from './sidebar/SmallCalendar';
import ViewMenu from './sidebar/ViewMenu';
import GlobalContext from '../context/GlobalContext';
import CreateCategoryButton from './sidebar/CreateCategoryButton';

const Sidebar = ({ setView, view }) => {
  const { loggedInUserData } = useContext(GlobalContext);

  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      {(loggedInUserData?.role === 'planner' ||
        loggedInUserData?.role === 'admin') && <CreatePublicEvent />}
      {loggedInUserData?.role === 'admin' && <CreateCategoryButton />}
      
      <SmallCalendar />
      <ViewMenu setView={setView} view={view} />
    </aside>
  );
};

export default Sidebar;