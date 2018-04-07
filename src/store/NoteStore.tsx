import { observable, action, computed } from 'mobx';

export type NoteStoreType = {
  note: Note
  noteTitle: string
  noteBody: string
  changeTitle: (title: string) => void
  changeBody: (body: string) => void
};

type Note = {
  id: string
  title: string
  body: string
};

export default class NoteStore {
  @observable note: Note = {
    id: '',
    title: '',
    body: ''
  };

  @computed get noteTitle() {
    return this.note.title;
  }

  @computed get noteBody() {
    console.log(this.note.body);
    return this.note.body;
  }

  @action.bound changeTitle(title: string) {
    console.log(title);
    this.note.title = title;
  }

  @action.bound changeBody(body: string) {
    console.log(body);
    this.note.body = body;
  }
}