import { observable, computed, action, decorate, runInAction } from 'mobx';
import { Auth } from 'aws-amplify';


class UserStore {
  // State
  inProgress = false
  currentUser;

  // Computed
  get isUserConnected() {
    return !!this.currentUser;
  }

  // Actions
  async pullUser() {
    this.inProgress = true;
    Auth.currentAuthenticatedUser()
      .then(user => runInAction(() => this.currentUser = user))
      .finally(() => runInAction(() => this.inProgress = false));
  }

  forgetUser() {
    this.currentUser = undefined;
  }
}

decorate(UserStore, {
  inProgress: observable,
  currentUser: observable,
  isUserConnected: computed,
  pullUser: action,
  forgetUser: action
});

export default new UserStore();