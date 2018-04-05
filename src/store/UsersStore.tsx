import { observable, action, computed } from 'mobx';
import firebase from 'firebase';
import { firebaseAuth } from '../firebase';

type ProviderData = {
    uid: string
    displayName: string
    photoURL: string
};

type User = {
    providerData: Array<ProviderData>
};

type Result = {
    credential: Credential
    user: User
};

type Credential = {
    accessToken: string
    secret: string
};

export type UsersStoreType = {
    users: Array<ProviderData>
    addUser: (user: ProviderData) => void
    loginUserName: string
    isLogin: boolean
    loginUserPhotoURL: string
    loginUser: () => void
    logoutUser: () => void
};

export default class UsersStore {
    @observable users = new Array<ProviderData>();

    @computed get loginUserName() {
        return this.users.map((n) => n.displayName).join(',');
    }

    @computed get loginUserPhotoURL() {
        return this.users.map((n) => n.photoURL).join(',');
    }

    @computed get isLogin() {
        if (this.users.length === 0) {
            return false;
        }
        return true;
    }

    @action.bound loginUser() {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebaseAuth.signInWithPopup(provider).then((result: Result) => {
            const user = result.user;
            this.users.push(user.providerData[0]);
            console.log('login success');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            console.log('login failed');
        });
    }

    @action.bound logoutUser() {
        const currentUser = firebaseAuth.currentUser;
        firebaseAuth.signOut().then(() => {
            console.log('logout success');
            this.users = this.users.filter((user) => user.uid !== currentUser!.providerData[0]!.uid);
        }).catch((error) => {
            console.log('logout failed');
        });
    }
}