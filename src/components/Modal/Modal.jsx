import React from 'react';
import { observer } from 'mobx-react-lite';

import InputField from '@components/InputField/InputField';

import modal from '/src/store/modal';
import MoviesFields from '/src/store/moviesFields';
import moviesList from '/src/store/moviesList';

import './Modal.scss';

const Modal = observer(() => {
  const modalField = new MoviesFields();

  if (!modal.modal) return null;

  return (
    <div className='modal' onClick={() => modal.closeModal()}>
      <form
        action=''
        className='modal-form'
        onSubmit={(event) => {
          event.preventDefault();
          modalField.clear();
          modal.closeModal();
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <a className='cross' id='modal-cross' onClick={() => modal.closeModal()}>
          <span className='cross-line'></span>
          <span className='cross-line'></span>
        </a>
        <div className='modal__form-data'>
          {modalField.fields.map((field, index) => {
            return (
              <InputField
                element={field}
                className='modal__input'
                key={index}
                changeData={(event) => modalField.update(field.name, event.target.value)}
              />
            );
          })}
        </div>
        <button
          className='modal-form__submit'
          onClick={() => {
            let data = {};
            data.id = new Date().toISOString();
            modalField.fields.map((field) => {
              data[field.name] = field.value;
            });

            modalField.isFullFilled();
            modalField.isCorrectData();

            if (modalField.fullFilled && modalField.correctData) {
              moviesList.addItem(data);
              modal.closeModal();
            }
          }}
        >
          Добавить запись
        </button>
      </form>
    </div>
  );
});

export default Modal;
