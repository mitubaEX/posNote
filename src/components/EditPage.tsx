import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import MyAppBar from './MyAppBar';
import EditPageBody from './EditPageBody';

type Props = {
    users?: UsersStoreType
    note?: NoteStoreType
};

@inject('users')
@inject('note')
@observer
export default class EditPage extends Component<Props> {
    render() {
        const { note } = this.props;
        const { users } = this.props;
        return (
            <div>
                <MyAppBar users={users!}/>
                <EditPageBody note={note!}/>
            </div>
        );
    }
}