import { observable, runInAction, action } from 'mobx';
import axios from 'axios';
const HOST = 'http://localhost:3000'

export default class CurricoosStore {
  curricoos = observable([]);

  fetchCurricoos = action(async () => {
    try {
      const response = await axios.get(
        `${HOST}/api/curricoos`
      )
      const curricoos = response.data;
      curricoos.map(curricoo => 
        runInAction(() => this.curricoos.push(curricoo))
      )
    } catch (err) {
      console.error(err)
    }
  })

  createCurricoo = action(async (curricooData) => {
    try {
      const response = await axios.post(
        `${HOST}/api/curricoos`, 
        curricooData
      )
      const curricoo = response.data;
      runInAction(() =>
        this.curricoos.push(curricoo)
      )

      return curricoo.id
    } catch (err) {
      console.error(err)
    }
  })
}