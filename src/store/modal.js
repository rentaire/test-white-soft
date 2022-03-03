import { makeAutoObservable } from 'mobx';

class Modal {
  modal = false;

  constructor() {
    makeAutoObservable(this);
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  getModal() {
    return this.modal;
  }
}


export default new Modal();

