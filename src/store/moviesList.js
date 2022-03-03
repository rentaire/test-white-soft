import { makeAutoObservable, runInAction } from 'mobx';
import movies from '/src/data/MOCK_DATA.json';

import Movie from './movie';

class MoviesList {
  initialMoviesList = [];
  moviesList = [];

  constructor() {
    makeAutoObservable(this);
    this.loadItems();
  }

  loadItems() {
    movies.map((item) => {
      runInAction(() => {
        this.initialMoviesList.push(new Movie(item));
        this.moviesList = this.initialMoviesList;
      });
    });
  }

  addItem(data) {
    this.initialMoviesList.push(new Movie(data));
    this.moviesList = this.initialMoviesList;
  }

  removeItem(id) {
    this.initialMoviesList = this.initialMoviesList.filter((movie) => movie.id != id);
    this.moviesList = this.initialMoviesList;
  }

  filterItemRate(rate) {
    rate != 0
      ? (this.moviesList = this.initialMoviesList.filter((movie) => movie.rate == rate))
      : (this.moviesList = this.initialMoviesList);
  }

  updateItem(id, data) {
    this.initialMoviesList.map((movie) => movie.id === id && movie.changeData(data));
    this.moviesList = this.initialMoviesList;
  }
}

export default new MoviesList();
