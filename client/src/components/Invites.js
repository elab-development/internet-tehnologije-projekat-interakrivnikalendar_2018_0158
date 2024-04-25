import React, { useContext, useEffect, useState } from 'react';

import { getInvitesPopulated } from '../api/inviteRequests';
import Table from './invites/Table';
import SentInvitesTable from './invites/SentInvitesTable';
import GlobalContext from '../context/GlobalContext';

const Invites = ({ type }) => {
  const [invites, setInvites] = useState([]);
  const [changeFlag, setChangeFlag] = useState(false);
  const { loggedInUserData } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvitesPopulated({
          id: loggedInUserData?._id,
          type: type,
        });
        setInvites(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [changeFlag]);

  return (
    <div className='pt-4 min-h-full'>
      {invites?.length > 0 && (
        <>
          {type === 'my' ? (
            <Table
              tableData={invites}
              setChangeFlag={setChangeFlag}
              changeFlag={changeFlag}
            />
          ) : (
            <SentInvitesTable tableData={invites} />
          )}
        </>
      )}
    </div>
  );
};

export default Invites;