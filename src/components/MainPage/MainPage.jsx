import React from 'react';

import Table from '@components/Table';
import Modal from '@components/Modal';

import modal from '/src/store/modal';
import moviesList from '/src/store/moviesList';

import './MainPage.scss';

const MainPage = () => {
  return (
    <div className='main-page'>
      <div className='container'>
        <select
          className='main-page__select'
          onChange={(event) => moviesList.filterItemRate(event.target.value)}
        >
          <option value={0} defaultValue>
            Выберите оценку
          </option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
        <Table />
        <Modal />
        <button className='main-page__btn-add' onClick={() => modal.openModal()}>
          Добавить новую запись
        </button>
      </div>
    </div>
  );
};


export default MainPage;
