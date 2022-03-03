import { makeAutoObservable } from 'mobx';

class Movie {
  id;
  title;
  rate;
  comment;
  date;

  constructor(data) {
    makeAutoObservable(this);

    this.id = data.id;
    this.title = data.title;
    this.rate = data.rate;
    this.comment = data.comment;
    this.date = data.date;
  }

  changeData(data) {
    this.id = data.id ? data.id : this.id;
    this.title = data.title ? data.title : this.title;
    this.rate = data.rate ? data.rate : this.rate;
    this.comment = data.comment ? data.comment : this.comment;
    this.date = data.date ? data.date : this.date;
  }
}

export default Movie;
