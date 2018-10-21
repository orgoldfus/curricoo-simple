import axios from 'axios';
const HOST = 'http://localhost:3000';

async function fetchCurricoos() {
  try {
    const response = await axios.get(
      `${HOST}/api/curricoos`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function fetchCurricoo({ curricooId }) {
  try {
    const response = await axios.get(
      `${HOST}/api/curricoos/${curricooId}`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function fetchEntries({ curricooId }) {
  try {
    const response = await axios.get(
      `${HOST}/api/curricoos/${curricooId}/entries`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createCurricoo(curricooData) {
  try {
    const response = await axios.post(
      `${HOST}/api/curricoos`, 
      curricooData
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteCurricoo({ curricooId }) {
  try {
    await axios.delete(
      `${HOST}/api/curricoos/${curricooId}`
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createEntry(entryData) {
  try {
    const response = await axios.post(
      `${HOST}/api/curricoos/${entryData.curricooId}/entries`, 
      entryData
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteEntry({ curricooId, entryId }) {
  try {
    await axios.delete(
      `${HOST}/api/curricoos/${curricooId}/entries/${entryId}`
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  createCurricoo,
  deleteCurricoo,
  fetchCurricoo,
  fetchCurricoos,
  createEntry,
  deleteEntry,
  fetchEntries
};