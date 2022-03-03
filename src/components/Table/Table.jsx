import React from 'react';
import { observer } from 'mobx-react-lite';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

import moviesList from '/src/store/moviesList';

import './Table.scss';

const Table = observer(() => {
  return (
    <table className='table'>
      <TableHeader />
      <tbody className='table__body'>
        {moviesList.moviesList.map((element, index) => {
          return <TableRow element={element} key={index} />;
        })}
      </tbody>
    </table>
  );
});

export default Table;
