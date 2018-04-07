import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import MyAppBar from './MyAppBar';
import EditPageBody from './EditPageBody';

type Props = {
  usersStore?: UsersStoreType
  noteStore?: NoteStoreType
};

@inject('usersStore')
@inject('noteStore')
@observer
export default class EditPage extends Component<Props> {
  render() {
    const { noteStore } = this.props;
    const { usersStore } = this.props;
    return (
      <div>
        <MyAppBar usersStore={usersStore!} />
        <EditPageBody noteStore={noteStore!} />
      </div>
    );
  }
}