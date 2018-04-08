import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { NoteListStoreType } from '../store/NoteListStore';
import { inject, observer } from 'mobx-react';
import TopPageBody from './TopPageBody';

type Props = {
  usersStore?: UsersStoreType
  noteStore?: NoteStoreType
  noteListStore?: NoteListStoreType
};

@inject('usersStore')
@inject('noteStore')
@inject('noteListStore')
@observer
export default class TopPage extends Component<Props> {
  render() {
    return (
      <div>
        <TopPageBody
          match={{ params: { uid: '' } }}
        />
      </div>
    );
  }
}