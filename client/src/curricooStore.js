import { observable, runInAction, action } from 'mobx';
import axios from 'axios';
const HOST = 'http://localhost:3000';

export default class CurricoosStore {
  curricoos = observable([]);
  entries = observable([]);

  fetchCurricoos = action(async () => {
    try {
      const response = await axios.get(
        `${HOST}/api/curricoos`
      );
      const curricoos = response.data;
      this.curricoos.length = 0;
      curricoos.map(curricoo => 
        runInAction(() => this.curricoos.push(curricoo))
      );
    } catch (err) {
      console.error(err);
    }
  })

  fetchEntries = action(async (curricooId) => {
    try {
      const response = await axios.get(
        `${HOST}/api/curricoos/${curricooId}/entries`
      );
      const entries = response.data;
      this.entries.length = 0;
      entries.map(entry => 
        runInAction(() => this.entries.push(entry))
      );
    } catch (err) {
      console.error(err);
    }
  })

  createCurricoo = action(async (curricooData) => {
    try {
      const response = await axios.post(
        `${HOST}/api/curricoos`, 
        curricooData
      );
      const curricoo = response.data;
      runInAction(() =>
        this.curricoos.push(curricoo)
      );

      return curricoo.id;
    } catch (err) {
      console.error(err);
    }
  })

  createEntry = action(async (entryData) => {
    try {
      const response = await axios.post(
        `${HOST}/api/curricoos/${entryData.curricooId}/entries`, 
        entryData
      );
      const entry = response.data;
      runInAction(() =>
        this.entries.push(entry)
      );

      return true;
    } catch (err) {
      console.error(err);
    }
  })
}