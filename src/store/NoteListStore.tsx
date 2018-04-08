import { observable, action, computed } from 'mobx';
import { firebaseDb } from '../firebase';
import { Note } from './NoteStore';

export type NoteListStoreType = {
  currentUserNoteList: Array<Note>
  fetchAllUserNoteList: () => void
  findByNoteId: (uid: string) => Note
  findByUID: (uid: string) => Array<Note>
};

type EachUIDNoteList = {
  uid: string
  eachUIDNoteList: Array<Note>
};

const getNoteList = (dbData: {}): Array<EachUIDNoteList> => {
  return Object.keys(dbData).map((n) => {
    return {
      uid: n,
      eachUIDNoteList: Object.keys(dbData[n]).map((m) => { return Object.assign(dbData[n][m], {id: m}); })
    };
  });
};

export default class NoteListStore {
  @observable allUserNoteList: Array<EachUIDNoteList> = new Array<EachUIDNoteList>();

  @observable userNoteList: Array<Note> = new Array<Note>();

  @computed get currentUserNoteList() {
    return this.userNoteList;
  }

  @action async fetchAllUserNoteList() {
    try {
      const dbData = ((await firebaseDb.ref('posts').once('value')).val());
      const eachUIDNoteList = getNoteList(dbData);
      this.allUserNoteList = eachUIDNoteList;
      var noteList = new Array<Note>();
      eachUIDNoteList.map((n) => n.eachUIDNoteList.map((m) => {
        const note = {
          id: m.id,
          title: m.title,
          timestamp: m.timestamp,
          body: m.body,
          isPosted: false,
          snackbarMessage: '',
          displayName: m.displayName,
          photoURL: m.photoURL
        };
        noteList.push(note);
      }));
      this.userNoteList = noteList;
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound findByUID(uid: string) {
    this.userNoteList = this.allUserNoteList.filter((n) => n.uid === uid).map((n) => n.eachUIDNoteList)[0];
    if (this.userNoteList) {
      return this.userNoteList;
    }
    return [];
  }

  @action.bound findByNoteId(id: string) {
    var note: Note = {
      id: '',
      isPosted: false,
      timestamp: '',
      title: '',
      body: '',
      snackbarMessage: '',
      photoURL: '',
      displayName: ''
    };
    this.allUserNoteList.forEach((n) => n.eachUIDNoteList.forEach((m) => {
      if (m.id === id) {
        note = m;
      } 
    }));
    return note;
  }
}