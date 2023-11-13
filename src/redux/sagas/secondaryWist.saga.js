import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";

//saga for fetching data
function* fetchSecondaryWist(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/secondary_wist/${action.payload}`
    );
    yield put({ type: "SET_SECONDARY_WIST", payload: response.data });
  } catch (error) {
    console.log("Error fetching secondary wist data", error);
  }
}

//saga for adding data to wist
function* addSecondaryWist(action) {
  try {
    yield call(axios.post, "/api/secondary_wist", action.payload);
    yield put({
      type: "FETCH_SECONDARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding secondary wist data", error);
  }
}
// saga for updating wist need student id as well as test id
function* updateSecondaryWist(action) {
  try {
    yield call(
      axios.put,
      `/api/secondary_wist/${action.payload.student_id}/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_SECONDARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating secondary wist data", error);
  }
}
// saga for deleting an individual wist test for a student. needs student id and test id
function* deleteSecondaryWist(action) {
  try {
    yield call(
      axios.delete,
      `/api/secondary_wist/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_SECONDARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error deleting secondary wist data", error);
  }
}
// watcher saga
function* secondaryWistSaga() {
  yield takeLatest("FETCH_SECONDARY_WIST", fetchSecondaryWist);
  yield takeLatest("ADD_SECONDARY_WIST", addSecondaryWist);
  yield takeLatest("UPDATE_SECONDARY_WIST", updateSecondaryWist);
  yield takeLatest("DELETE_SECONDARY_WIST", deleteSecondaryWist);
}

export default secondaryWistSaga;
