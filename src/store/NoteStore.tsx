import { observable, action, computed } from 'mobx';
import { firebaseDb } from '../firebase';
import { usersStore } from '../data_store';

export type NoteStoreType = {
  note: Note
  noteTitle: string
  noteBody: string
  changeTitle: (title: string) => void
  changeBody: (body: string) => void
  postNote: () => void
  finishPost: () => void
};

type Note = {
  id: string
  title: string
  body: string
  isPosted: boolean
};

export default class NoteStore {
  @observable note: Note = {
    id: '',
    title: '',
    body: '',
    isPosted: false
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

  @action.bound postNote() {
    firebaseDb.ref('posts/' + usersStore.loginUID).push({
      title: this.noteTitle,
      body: this.noteBody,
      timestamp: Math.floor(new Date().getTime() / 1000)
    });
    this.note.title = '';
    this.note.body = '';
    this.note.isPosted = true;
  }

  @action.bound finishPost() {
    this.note.isPosted = false;
  }
}