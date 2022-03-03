import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import moviesList from '/src/store/moviesList';
import MoviesFields from '/src/store/moviesFields';
import InputField from '@components/InputField/InputField';

const TableRow = observer(({ element }) => {
  const moviesFields = new MoviesFields();

  const [isEdit, setIsEdit] = useState(false);

  function toggleIsEdit() {
    setIsEdit((prevState) => {
      return !prevState;
    });
  }

  return (
    <tr className='table__body-row'>
      {!isEdit ? (
        <>
          <td className='table__cell'>{element.title}</td>
          <td className='table__cell'>{element.rate}</td>
          <td className='table__cell'>{element.date}</td>
          <td className='table__cell'>{cutString(element.comment, 200)}</td>
        </>
      ) : (
        moviesFields.fields.map((field, index) => {
          return (
            <td className='table__cell' key={index}>
              <InputField
                element={field}
                className='table__input'
                changeData={(event) => moviesFields.update(field.name, event.target.value)}
              />
            </td>
          );
        })
      )}
      <td className='table__cell'>
        <button
          onClick={() => {
            moviesList.removeItem(element.id);
            setIsEdit(false);
          }}
        >
          Удалить
        </button>
      </td>
      <td className='table__cell'>
        <button
          onClick={() => {
            if (isEdit) {
              let data = {};
              moviesFields.fields.map((field) => field.value ? data[field.name] = field.value : field.value)
 
              moviesFields.isCorrectData();

              if (moviesFields.correctData) {
                moviesList.updateItem(element.id, data);
                moviesFields.clear();

                toggleIsEdit();
              }
            } else {
              toggleIsEdit();
            }
          }}
        >
          {isEdit ? 'Сохранить' : 'Редактировать'}
        </button>
      </td>
    </tr>
  );
});

function cutString(str, limit) {
  if (str.length <= limit) return str;

  str = str.slice(0, limit);
  let lastSpace = str.lastIndexOf(' ');

  if (lastSpace > 0) {
    str = str.substr(0, lastSpace);
  }

  return str + '...';
}

export default TableRow;
