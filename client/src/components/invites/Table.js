import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import avatar from '../../assets/usercalendar.png';
import TableAnswer from './TableAnswer';

const Table = ({ tableData, setChangeFlag, changeFlag }) => {
  const columnHelper = createColumnHelper();
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: '#',
    }),
    columnHelper.accessor((row) => row.to.profile, {
      id: 'profile',
      cell: (info) => (
        <img
          className='rounded-full w-10'
          src={info.getValue() || avatar}
          alt='profile'
        />
      ),
      header: 'user',
    }),
    columnHelper.accessor((row) => row.to.username, {
      id: 'username',
      cell: (info) => <p className='font-bold'>{info.getValue()}</p>,
      header: '',
    }),
    columnHelper.accessor((row) => row.to.email, {
      id: 'email',
      cell: (info) => <p>{info.getValue()}</p>,
      header: '',
    }),
    columnHelper.accessor((row) => row.event.title, {
      id: 'event',
      cell: (info) => <p className='font-bold'>{info.getValue()}</p>,
      header: 'event',
    }),
    columnHelper.accessor((row) => row.event.description, {
      id: 'description',
      cell: (info) => <p>{info.getValue()}</p>,
      header: 'description',
    }),
    columnHelper.accessor((row) => row.event.location, {
      id: 'location',
      cell: (info) => <p>{info.getValue()}</p>,
      header: 'location',
    }),
    columnHelper.accessor((row) => row.event.date, {
      id: 'date',
      cell: (info) => <p>{info.getValue()}</p>,
      header: 'date',
    }),
    columnHelper.accessor((row) => row, {
      id: 'answer',
      cell: (info) => (
        <TableAnswer
          row={info.getValue()}
          setChangeFlag={setChangeFlag}
          changeFlag={changeFlag}
        />
      ),
      header: 'answer',
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='p-2 max-w-5xl mx-auto fill-gray-400'>
      {tableData && table && (
        <table>
          <thead className='bg-gray-600 text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='capitalize px-3.5 py-2'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='px-3.5 py-2'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className='text-center h-32'>
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className='flex items-center justify-end mt-2 gap-2'>
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className='p-1 border border-gray-300 px-2 disabled:opacity-30'
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className='p-1 border border-gray-300 px-2 disabled:opacity-30'
        >
          {'>'}
        </button>

        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16 bg-transparent'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className='p-2 bg-transparent'
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;