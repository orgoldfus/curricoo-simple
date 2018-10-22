import { observable, computed, action, decorate, runInAction } from 'mobx';
import userStore from './userStore';
import { Auth } from 'aws-amplify';


class AuthStore {
  // State
  // inProgress = false

  // Computed

  // Actions
  async login({ username, password }) {
    // this.inProgress = true;
    
    Auth.signIn(username, password)
      .then(() => userStore.pullUser());
    // .finally(() => runInAction(() => this.inProgress = false));
  }

  async logout() {
    Auth.signOut()
      .then(() => userStore.forgetUser());
  }
}

decorate(AuthStore, {
  inProgress: observable,
  REPLACEME: computed,
  login: action,
  logout: action
});

export default new AuthStore();