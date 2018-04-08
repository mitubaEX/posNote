import NoteStore from '../store/NoteStore';
import UsersStore from '../store/UsersStore';
import NoteListStore from '../store/NoteListStore';
import { NoteStoreType } from '../store/NoteStore';
import { UsersStoreType } from '../store/UsersStore';
import { NoteListStoreType } from '../store/NoteListStore';

export const noteStore: NoteStoreType = new NoteStore();
export const usersStore: UsersStoreType = new UsersStore();
export const noteListStore: NoteListStoreType = new NoteListStore();