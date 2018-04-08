import { observable, action, computed } from 'mobx';
import { firebaseDb } from '../firebase';
import { usersStore } from '../data_store';

export type NoteStoreType = {
  note: Note
  noteTitle: string
  noteBody: string
  isEnable: boolean
  changeTitle: (title: string) => void
  changeBody: (body: string) => void
  postNote: () => void
  finishPost: () => void
};

export type Note = {
  id: string
  title: string
  body: string
  isPosted: boolean
  timestamp: string
  snackbarMessage: string
  photoURL: string,
  displayName: string
};

const unixTimeToDate = (time: number) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`;
};

export default class NoteStore {
  @observable note: Note = {
    id: '',
    title: '',
    body: '',
    isPosted: false,
    timestamp: '',
    snackbarMessage: '',
    photoURL: '',
    displayName: ''
  };

  @computed get noteTitle() {
    return this.note.title;
  }

  @computed get noteBody() {
    return this.note.body;
  }

  @computed get isEnable() {
    if ( this.note.title === '' || this.note.body === '' ) {
      return false;
    }
    return true;
  }

  @action.bound changeTitle(title: string) {
    this.note.title = title;
  }

  @action.bound changeBody(body: string) {
    this.note.body = body;
  }

  @action.bound postNote() {
    if ( this.note.title === '' || this.note.body === '' ) {
      this.note.snackbarMessage = 'タイトルと本文を設定してください！';
      this.note.isPosted = true;
    } else {
      firebaseDb.ref('posts/' + usersStore.loginUID).push({
        title: this.noteTitle,
        body: this.noteBody,
        timestamp: unixTimeToDate(new Date().getTime()),
        displayName: usersStore.users[0].displayName,
        photoURL: usersStore.users[0].photoURL
      });
      this.note.title = '';
      this.note.body = '';
      this.note.snackbarMessage = '記事が投稿されました！';
      this.note.isPosted = true;
    }
  }

  @action.bound finishPost() {
    this.note.isPosted = false;
  }
}