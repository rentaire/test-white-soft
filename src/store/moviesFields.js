import { makeAutoObservable } from 'mobx';

class MoviesFields {
  fullFilled = false;
  correctData = false;

  initialState = [
    {
      name: 'title',
      value: '',
      placeholder: 'Название',
      type: 'text',
      required: 'required',
    },
    {
      name: 'rate',
      value: '',
      placeholder: 'Оценка',
      type: 'text',
      pattern: '^[1-5]{1}$',
      required: 'required',
    },
    {
      name: 'date',
      value: '',
      placeholder: 'Дата',
      type: 'date',
      required: 'required',
    },
    {
      name: 'comment',
      value: '',
      placeholder: 'Описание',
      type: 'text',
      required: 'required',
    },
  ];

  fields = [
    {
      name: 'title',
      value: '',
      placeholder: 'Название',
      type: 'text',
      required: 'required',
    },
    {
      name: 'rate',
      value: '',
      placeholder: 'Оценка',
      type: 'text',
      pattern: '^[1-5]{1}$',
      required: 'required',
    },
    {
      name: 'date',
      value: '',
      placeholder: 'Дата',
      type: 'date',
      required: 'required',
    },
    {
      name: 'comment',
      value: '',
      placeholder: 'Описание',
      type: 'text',
      required: 'required',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  update(name, value) {
    this.fields.map((field) => field.name === name && (field['value'] = value));
  }

  clear() {
    this.fields = this.initialState;
  }

  isFullFilled() {
    this.fullFilled = this.fields.filter((field) => !field.value).length === 0 ? true : false;
  }

  isCorrectData() {
    this.correctData = this.fields
      .filter((field) => field.value)
      .map((field) => new RegExp(field.pattern).test(field.value))
      .reduce((prev, curr) => prev && curr);
  }
}

export default MoviesFields;
export const modalField = new MoviesFields();
