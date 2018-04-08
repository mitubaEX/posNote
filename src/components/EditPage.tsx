import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
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
    return (
      <div>
        <EditPageBody noteStore={noteStore!} />
      </div>
    );
  }
}