import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import CountStore from '../store/CountStore';
import Counter from '../components/Counter';

const stores = new CountStore();

export default class CountContainer extends Component {
    render() {
        return (
            <Provider count={stores}>
                <Counter />
            </Provider>
        );
    }
}