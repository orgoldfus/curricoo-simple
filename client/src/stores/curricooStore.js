import { observable, computed, action, decorate, runInAction } from 'mobx';
import API from '../api';

class CurricoosStore {
  // State
  curricoos = [];
  entries = [];
  currentCurricooId;
  inProgress = false;

  // Computed
  get currentCurricoo() {
    return this.curricoos && this.curricoos.find(curricoo => 
      curricoo.id === this.currentCurricooId
    );
  }

  // Actions
  setCurrentCurricoo(curricooId) {
    this.currentCurricooId = curricooId;
    this.fetchEntries({ curricooId });
  }

  async fetchCurricoos() {
    const curricoos = await API.fetchCurricoos();
    
    this.curricoos.length = 0;
    curricoos.map(curricoo => 
      runInAction(() => this.curricoos.push(curricoo))
    );
  }

  async fetchCurricoo(curricooData) {
    this.inProgress = true;

    try {
      const curricoo = await API.fetchCurricoo(curricooData);
      if (curricoo) {
        this.curricoos.push(curricoo);
      }
    } finally {
      this.inProgress = false;
    }
  }

  async fetchEntries(curricooData) {
    const entries = await API.fetchEntries(curricooData);

    this.entries.length = 0;
    entries.map(entry => 
      runInAction(() => this.entries.push(entry))
    );
  }

  async createCurricoo(curricooData) {
    const curricoo = await API.createCurricoo(curricooData);

    this.curricoos.push(curricoo);

    return curricoo.id;
  }

  async deleteCurricoo(curricooData) {
    await API.deleteCurricoo(curricooData);

    const deletedCurricooIndex = this.curricoos.findIndex(
      curricoo => curricoo.id === curricooData.curricooId
    );
    this.entries.length = 0;
    this.curricoos.splice(deletedCurricooIndex, 1);
  }

  async createEntry(entryData) {
    const entry = await API.createEntry(entryData);
    
    this.entries.push(entry);
  }

  async deleteEntry(entryData) {
    await API.deleteEntry(entryData);

    const deletedEntryIndex = this.entries.findIndex(
      entry => entry.id === entryData.entryId
    );
    this.entries.splice(deletedEntryIndex, 1);
  }
}

decorate(CurricoosStore, {
  curricoos: observable,
  entries: observable,
  currentCurricooId: observable,
  inProgress: observable,
  currentCurricoo: computed,
  setCurrentCurricoo: action,
  fetchCurricoos: action,
  fetchCurricoo: action,
  fetchEntries: action,
  createCurricoo: action,
  deleteCurricoo: action,
  createEntry: action,
  deleteEntry: action
});

export default new CurricoosStore();