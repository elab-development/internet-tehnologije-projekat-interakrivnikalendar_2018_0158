import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { updateInvite } from '../../api/inviteRequests';

const TableAnswer = ({ row, setChangeFlag, changeFlag }) => {
  const handleConfirm = async () => {
    let updatePromise = updateInvite(row._id, {
      rsvp: true,
      answer: 'yes',
    });

    toast.promise(updatePromise, {
      loading: 'Responding...',
      success: <b>Responded Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    updatePromise
      .then(() => {
        setChangeFlag(!changeFlag);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReject = async () => {
    let updatePromise = updateInvite(row._id, {
      rsvp: true,
      answer: 'no',
    });

    toast.promise(updatePromise, {
      loading: 'Responding...',
      success: <b>Responded Successfully!</b>,
      error: <b>Something went wrong!</b>,
    });
    updatePromise
      .then(() => {
        setChangeFlag(!changeFlag);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(row);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {row.answer === 'notanswered' && (
        <div className='flex items-center gap-2'>
          <button
            onClick={handleConfirm}
            className='material-icons-outlined text-green-500'
          >
            check
          </button>
          <button
            onClick={handleReject}
            className='material-icons-outlined text-red-500'
          >
            close
          </button>
        </div>
      )}
      {row.answer === 'yes' && <p className='text-green-500'>Confirmed</p>}
      {row.answer === 'no' && <p className='text-red-500'>Rejected</p>}
    </>
  );
};

export default TableAnswer;