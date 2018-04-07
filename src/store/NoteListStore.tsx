import { observable, action, computed } from 'mobx';
import { firebaseDb } from '../firebase';
import { Note } from './NoteStore';

export type NoteListStoreType = {
  currentUserNoteList: Array<Note>
  getUserNoteList: () => void
  fetchAllUserNoteList: () => void
};

type EachUIDNoteList = {
  uid: string
  eachUIDNoteList: Array<Note>
};

const getNoteList = (dbData: {}): Array<EachUIDNoteList> => {
  return Object.keys(dbData).map((n) => {
    return {
      uid: n,
      eachUIDNoteList: Object.keys(dbData[n]).map((m) => { return dbData[n][m]; })
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
          title: m.title,
          timestamp: m.timestamp,
          body: m.body,
          isPosted: false,
          snackbarMessage: ''
        };
        noteList.push(note);
      }));
      this.userNoteList = noteList;
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound filteredByUID(uid: string) {
    this.userNoteList = this.allUserNoteList.filter((n) => n.uid === uid).map((n) => n.eachUIDNoteList)[0];
  }
}